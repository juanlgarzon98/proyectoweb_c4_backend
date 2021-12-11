import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Ciudades} from './ciudades.model';
import {Solicitudes} from './solicitudes.model';

@model()
export class Inmuebles extends Entity {
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
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoinmueble: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
    required: true,
  })
  tipooferta: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoventa: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoinmueble: string;

  @property({
    type: 'string',
    required: true,
  })
  fotografia: string;

  @property({
    type: 'string',
    required: true,
  })
  linkvideo: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaventa: string;

  @property({
    type: 'string',
    required: true,
  })
  porcentajeextra: string;

  @belongsTo(() => Ciudades)
  ciudadesId: string;

  @hasMany(() => Solicitudes)
  solicitudes: Solicitudes[];

  constructor(data?: Partial<Inmuebles>) {
    super(data);
  }
}

export interface InmueblesRelations {
  // describe navigational properties here
}

export type InmueblesWithRelations = Inmuebles & InmueblesRelations;
