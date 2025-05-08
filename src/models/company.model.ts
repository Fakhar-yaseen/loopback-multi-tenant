import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Company extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  companyId?: number;

  @property({
    type: 'string',
    required: true,
  })
  companyName: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'number',
    required: true,
  })
  rate: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Company>) {
    super(data);
  }
}

export interface CompanyRelations {
  // describe navigational properties here
}

export type CompanyWithRelations = Company & CompanyRelations;
