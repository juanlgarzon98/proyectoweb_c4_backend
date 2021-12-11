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
  Usuarios,
} from '../models';
import {SolicitudesRepository} from '../repositories';

export class SolicitudesUsuariosController {
  constructor(
    @repository(SolicitudesRepository)
    public solicitudesRepository: SolicitudesRepository,
  ) { }

  @get('/solicitudes/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Usuarios belonging to Solicitudes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async getUsuarios(
    @param.path.string('id') id: typeof Solicitudes.prototype.id,
  ): Promise<Usuarios> {
    return this.solicitudesRepository.usuarios(id);
  }
}
