import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Permissions, PermissionsRelations} from '../models/permissions.model';

export class PermissionRepository extends DefaultCrudRepository<
  Permissions,
  typeof Permissions.prototype.id,
  PermissionsRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Permissions, dataSource);
  }
}
