import {Model, model, property} from '@loopback/repository';

@model()
export class MensajeSms extends Model {
  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;


  constructor(data?: Partial<MensajeSms>) {
    super(data);
  }
}

export interface MensajeSmsRelations {
  // describe navigational properties here
}

export type MensajeSmsWithRelations = MensajeSms & MensajeSmsRelations;
