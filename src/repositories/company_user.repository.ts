import {inject} from '@loopback/core';
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {CompanyUser, CompanyUserRelations} from '../models/company_user.model';

export class CompanyUserRepository extends DefaultCrudRepository<
  CompanyUser,
  typeof CompanyUser.prototype.id,
  CompanyUserRelations
> {
  constructor(@inject('datasources.company') dataSource: juggler.DataSource) {
    super(CompanyUser, dataSource);
  }
}
