import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {
  UserCompanies,
  UserCompaniesRelations,
} from '../models/usercompanies.model';

export class UserCompaniesRepository extends DefaultCrudRepository<
  UserCompanies,
  typeof UserCompanies.prototype.id,
  UserCompaniesRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(UserCompanies, dataSource);
  }
}
