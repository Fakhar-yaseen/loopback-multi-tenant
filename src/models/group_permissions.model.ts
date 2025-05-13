import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Group} from './groups.model';

@model({
  name: 'group_permissions',
})
export class GroupPermission extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'Array',
    itemType: 'string',
  })
  permissionIds?: Array<string>;

  @belongsTo(() => Group, {name: 'groups'})
  groupId: number;

  constructor(data?: Partial<GroupPermission>) {
    super(data);
  }
}

export interface GroupPermissionRelations {
  // describe navigational properties here
}

export type GroupPermissionWithRelations = GroupPermission &
  GroupPermissionRelations;
