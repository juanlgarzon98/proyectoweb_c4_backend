import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Inmuebles} from './inmuebles.model';

@model()
export class Ciudades extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @belongsTo(() => Departamento)
  departamentoId: string;

  @hasMany(() => Inmuebles)
  inmuebles: Inmuebles[];

  constructor(data?: Partial<Ciudades>) {
    super(data);
  }
}

export interface CiudadesRelations {
  // describe navigational properties here
}

export type CiudadesWithRelations = Ciudades & CiudadesRelations;
