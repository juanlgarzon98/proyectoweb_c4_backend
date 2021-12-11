import {Entity, model, property, hasMany} from '@loopback/repository';
import {Ciudades} from './ciudades.model';

@model()
export class Departamento extends Entity {
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
    required: false,
  })
  descripcion: string;

  @hasMany(() => Ciudades)
  ciudades: Ciudades[];

  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
