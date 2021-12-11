import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ciudades,
  Departamento,
} from '../models';
import {CiudadesRepository} from '../repositories';

export class CiudadesDepartamentoController {
  constructor(
    @repository(CiudadesRepository)
    public ciudadesRepository: CiudadesRepository,
  ) { }

  @get('/ciudades/{id}/departamento', {
    responses: {
      '200': {
        description: 'Departamento belonging to Ciudades',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Departamento)},
          },
        },
      },
    },
  })
  async getDepartamento(
    @param.path.string('id') id: typeof Ciudades.prototype.id,
  ): Promise<Departamento> {
    return this.ciudadesRepository.departamento(id);
  }
}
