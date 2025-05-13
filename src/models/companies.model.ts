import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'companies',
})
export class Companies extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Companies>) {
    super(data);
  }
}

export interface CompaniesRelations {
  // describe navigational properties here
}

export type CompaniesWithRelations = Companies & CompaniesRelations;
