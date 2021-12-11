import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Inmuebles,
  Ciudades,
} from '../models';
import {InmueblesRepository} from '../repositories';

export class InmueblesCiudadesController {
  constructor(
    @repository(InmueblesRepository)
    public inmueblesRepository: InmueblesRepository,
  ) { }

  @get('/inmuebles/{id}/ciudades', {
    responses: {
      '200': {
        description: 'Ciudades belonging to Inmuebles',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudades)},
          },
        },
      },
    },
  })
  async getCiudades(
    @param.path.string('id') id: typeof Inmuebles.prototype.id,
  ): Promise<Ciudades> {
    return this.inmueblesRepository.ciudades(id);
  }
}
