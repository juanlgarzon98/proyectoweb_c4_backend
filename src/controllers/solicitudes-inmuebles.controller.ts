import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Solicitudes,
  Inmuebles,
} from '../models';
import {SolicitudesRepository} from '../repositories';

export class SolicitudesInmueblesController {
  constructor(
    @repository(SolicitudesRepository)
    public solicitudesRepository: SolicitudesRepository,
  ) { }

  @get('/solicitudes/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Inmuebles belonging to Solicitudes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmuebles)},
          },
        },
      },
    },
  })
  async getInmuebles(
    @param.path.string('id') id: typeof Solicitudes.prototype.id,
  ): Promise<Inmuebles> {
    return this.solicitudesRepository.inmuebles(id);
  }
}
