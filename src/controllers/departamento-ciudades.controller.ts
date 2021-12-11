import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Departamento,
  Ciudades,
} from '../models';
import {DepartamentoRepository} from '../repositories';

export class DepartamentoCiudadesController {
  constructor(
    @repository(DepartamentoRepository) protected departamentoRepository: DepartamentoRepository,
  ) { }

  @get('/departamentos/{id}/ciudades', {
    responses: {
      '200': {
        description: 'Array of Departamento has many Ciudades',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudades)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ciudades>,
  ): Promise<Ciudades[]> {
    return this.departamentoRepository.ciudades(id).find(filter);
  }

  @post('/departamentos/{id}/ciudades', {
    responses: {
      '200': {
        description: 'Departamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ciudades)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Departamento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudades, {
            title: 'NewCiudadesInDepartamento',
            exclude: ['id'],
            optional: ['departamentoId']
          }),
        },
      },
    }) ciudades: Omit<Ciudades, 'id'>,
  ): Promise<Ciudades> {
    return this.departamentoRepository.ciudades(id).create(ciudades);
  }

  @patch('/departamentos/{id}/ciudades', {
    responses: {
      '200': {
        description: 'Departamento.Ciudades PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudades, {partial: true}),
        },
      },
    })
    ciudades: Partial<Ciudades>,
    @param.query.object('where', getWhereSchemaFor(Ciudades)) where?: Where<Ciudades>,
  ): Promise<Count> {
    return this.departamentoRepository.ciudades(id).patch(ciudades, where);
  }

  @del('/departamentos/{id}/ciudades', {
    responses: {
      '200': {
        description: 'Departamento.Ciudades DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ciudades)) where?: Where<Ciudades>,
  ): Promise<Count> {
    return this.departamentoRepository.ciudades(id).delete(where);
  }
}
