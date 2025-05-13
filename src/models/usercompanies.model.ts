import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Companies} from './companies.model';
import {User} from './user.model';

@model({
  name: 'usercompanies',
})
export class UserCompanies extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Companies, {name: 'companies'})
  companyId: number;

  @belongsTo(() => User, {name: 'user'})
  userId: number;

  constructor(data?: Partial<UserCompanies>) {
    super(data);
  }
}

export interface UserCompaniesRelations {
  // describe navigational properties here
}

export type UserCompaniesWithRelations = UserCompanies & UserCompaniesRelations;
