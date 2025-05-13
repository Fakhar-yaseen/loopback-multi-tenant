import {injectable} from '@loopback/core';
import {CompanyUserRepository} from '../repositories/company_user.repository';
import {PermissionRepository} from '../repositories/permission.repository';
import {RoleRepository} from '../repositories/role.repository';
import {UserRepository} from '../repositories/user.repository';
import {createCompanyDatabase} from '../utils/database-manager';
import {createCompanyDataSource} from '../utils/dynamic-datasource-factory';

@injectable()
export class CompanySetupService {
  constructor() {}

  async initializeCompany(companyId: string): Promise<void> {
    await createCompanyDatabase(companyId);
    const ds = createCompanyDataSource(companyId);
    new CompanyUserRepository(ds);
    // new UserRepository(ds);
    // new RoleRepository(ds);
    // new PermissionRepository(ds);
    // new UserPermissionsRepository(ds);
    await ds.automigrate();

    console.log(`Initialized DB for company_${companyId}`);
  }

  getUserRepository(companyId: string): UserRepository {
    const dataSource = createCompanyDataSource(companyId);
    return new UserRepository(dataSource);
  }

  getRoleRepository(companyId: string): RoleRepository {
    const dataSource = createCompanyDataSource(companyId);
    return new RoleRepository(dataSource);
  }

  getPermissionRepository(companyId: string): PermissionRepository {
    const dataSource = createCompanyDataSource(companyId);
    return new PermissionRepository(dataSource);
  }
}
