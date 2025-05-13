import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Companies, Permissions, Role, User} from '../models';
import {CompanyRepository} from '../repositories';
import {CompanySetupService} from '../services';

export class CompanyController {
  constructor(
    @repository(CompanyRepository)
    public companyRepository: CompanyRepository,
    @inject('services.CompanySetupService')
    private companyService: CompanySetupService,
  ) {}

  @post('/companies')
  @response(200, {
    description: 'Company model instance',
    content: {'application/json': {schema: getModelSchemaRef(Companies)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Companies, {
            title: 'NewCompany',
            exclude: ['id'],
          }),
        },
      },
    })
    company: Omit<Companies, 'id'>,
  ): Promise<Companies | null> {
    await this.companyRepository.create(company);

    const existingCompany = await this.companyRepository.findOne({
      order: ['id DESC'],
    });

    if (existingCompany) {
      await this.companyService.initializeCompany(String(existingCompany.id));
    }
    return existingCompany;
  }

  @get('/companies/count')
  @response(200, {
    description: 'Company model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Companies) where?: Where<Companies>,
  ): Promise<Count> {
    return this.companyRepository.count(where);
  }

  @get('/companies')
  @response(200, {
    description: 'Array of Company model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Companies, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Companies) filter?: Filter<Companies>,
  ): Promise<Companies[]> {
    return this.companyRepository.find(filter);
  }

  @patch('/companies')
  @response(200, {
    description: 'Company PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Companies, {partial: true}),
        },
      },
    })
    company: Companies,
    @param.where(Companies) where?: Where<Companies>,
  ): Promise<Count> {
    return this.companyRepository.updateAll(company, where);
  }

  @get('/companies/{id}')
  @response(200, {
    description: 'Company model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Companies, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: number,
    @param.filter(Companies, {exclude: 'where'})
    filter?: FilterExcludingWhere<Companies>,
  ): Promise<Companies> {
    return this.companyRepository.findById(id, filter);
  }

  @patch('/companies/{id}')
  @response(204, {
    description: 'Company PATCH success',
  })
  async updateById(
    @param.path.string('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Companies, {partial: true}),
        },
      },
    })
    company: Companies,
  ): Promise<void> {
    await this.companyRepository.updateById(id, company);
  }

  @put('/companies/{id}')
  @response(204, {
    description: 'Company PUT success',
  })
  async replaceById(
    @param.path.string('id') id: number,
    @requestBody() company: Companies,
  ): Promise<void> {
    await this.companyRepository.replaceById(id, company);
  }

  @del('/companies/{id}')
  @response(204, {
    description: 'Company DELETE success',
  })
  async deleteById(@param.path.string('id') id: number): Promise<void> {
    await this.companyRepository.deleteById(id);
  }

  @post('/companies/init')
  async createCompanyAndInitialize(@requestBody() body: {companyId: string}) {
    const {companyId} = body;

    // Step 1: Create DB + Tables
    await this.companyService.initializeCompany(companyId);

    return {
      message: `Company ${companyId} initialized`,
      // adminUser,
    };
  }

  @post('/users')
  async createUser(@requestBody() userData: Omit<User, 'id'>): Promise<User> {
    const userRepo = this.companyService.getUserRepository('2');
    const user = await userRepo.create(userData);
    return user;
  }

  @post('/roles')
  async createRole(@requestBody() roleData: Omit<Role, 'id'>): Promise<Role> {
    const userRepo = this.companyService.getRoleRepository('1');
    const user = await userRepo.create(roleData);
    return user;
  }

  @post('/permissions')
  async createPermission(
    @requestBody() permissionData: Omit<Permissions, 'id'>,
  ): Promise<Permissions> {
    const userRepo = this.companyService.getPermissionRepository('1');
    const user = await userRepo.create(permissionData);
    return user;
  }
}
