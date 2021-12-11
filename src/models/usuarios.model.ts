import {Entity, model, property, hasMany} from '@loopback/repository';
import {Solicitudes} from './solicitudes.model';

@model()
export class Usuarios extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: false,
  })
  contrasena: string;

  @property({
    type: 'string',
    required: true,
  })
  rol: string;

  @property({
    type: 'string',
    required: false,
  })
  telefono: string;

  @property({
    type: 'string',
    required: false,
  })
  confirmacion: string;

  @hasMany(() => Solicitudes)
  solicitudes: Solicitudes[];

  constructor(data?: Partial<Usuarios>) {
    super(data);
  }
}

export interface UsuariosRelations {
  // describe navigational properties here
}

export type UsuariosWithRelations = Usuarios & UsuariosRelations;
