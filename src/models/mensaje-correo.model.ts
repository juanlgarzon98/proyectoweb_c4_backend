import {Model, model, property} from '@loopback/repository';

@model()
export class MensajeCorreo extends Model {
  @property({
    type: 'string',
    required: true,
  })
  destinatario: string;

  @property({
    type: 'string',
    required: true,
  })
  asunto: string;

  @property({
    type: 'string',
    required: true,
  })
  contenido: string;

  @property({
    type: 'string',
  })
  archivo?: string;


  constructor(data?: Partial<MensajeCorreo>) {
    super(data);
  }
}

export interface MensajeCorreoRelations {
  // describe navigational properties here
}

export type MensajeCorreoWithRelations = MensajeCorreo & MensajeCorreoRelations;
