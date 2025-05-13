import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Role} from './roles.model';

@model({
  name: 'company_user',
})
export class CompanyUser extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  password?: string;

  @belongsTo(() => Role, {name: 'role'})
  roleId: number;

  constructor(data?: Partial<CompanyUser>) {
    super(data);
  }
}

export interface CompanyUserRelations {
  // describe navigational properties here
}

export type CompanyUserWithRelations = CompanyUser & CompanyUserRelations;
