import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {
  GroupPermission,
  GroupPermissionRelations,
} from '../models/group_permissions.model';

export class GroupPermissionRepository extends DefaultCrudRepository<
  GroupPermission,
  typeof GroupPermission.prototype.id,
  GroupPermissionRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(GroupPermission, dataSource);
  }
}
