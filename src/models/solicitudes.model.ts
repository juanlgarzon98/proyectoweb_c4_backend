import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Inmuebles} from './inmuebles.model';
import {Usuarios} from './usuarios.model';

@model()
export class Solicitudes extends Entity {
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
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoaceptacion: string;

  @property({
    type: 'date',
    required: true,
  })
  fechasolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  linkcontrato: string;

  @property({
    type: 'string',
    required: true,
  })
  linkcontratofirmado: string;

  @belongsTo(() => Inmuebles)
  inmueblesId: string;

  @belongsTo(() => Usuarios)
  usuariosId: string;

  constructor(data?: Partial<Solicitudes>) {
    super(data);
  }
}

export interface SolicitudesRelations {
  // describe navigational properties here
}

export type SolicitudesWithRelations = Solicitudes & SolicitudesRelations;
