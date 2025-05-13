import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Companies} from './companies.model';
import {Group} from './groups.model';
import {Role} from './roles.model';
import {User} from './user.model';

@model({
  name: 'user_permissions',
})
export class UserPermissions extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Role, {name: 'role'})
  roleId: number;

  @belongsTo(() => User, {name: 'user'})
  userId: number;

  @belongsTo(() => Companies, {name: 'companies'})
  companyId: number;

  @belongsTo(() => Group, {name: 'groups'})
  groupId: number;

  constructor(data?: Partial<UserPermissions>) {
    super(data);
  }
}

export interface UserPermissionsRelations {
  // describe navigational properties here
}

export type UserPermissionsWithRelations = UserPermissions &
  UserPermissionsRelations;
