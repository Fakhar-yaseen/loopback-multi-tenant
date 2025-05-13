import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {
  UserPermissions,
  UserPermissionsRelations,
} from '../models/user_permissions.model';

export class UserPermissionsRepository extends DefaultCrudRepository<
  UserPermissions,
  typeof UserPermissions.prototype.id,
  UserPermissionsRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(UserPermissions, dataSource);
  }
}
