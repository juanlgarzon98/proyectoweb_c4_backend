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
  Ciudades,
  Inmuebles,
} from '../models';
import {CiudadesRepository} from '../repositories';

export class CiudadesInmueblesController {
  constructor(
    @repository(CiudadesRepository) protected ciudadesRepository: CiudadesRepository,
  ) { }

  @get('/ciudades/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Array of Ciudades has many Inmuebles',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmuebles)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Inmuebles>,
  ): Promise<Inmuebles[]> {
    return this.ciudadesRepository.inmuebles(id).find(filter);
  }

  @post('/ciudades/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Ciudades model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmuebles)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ciudades.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmuebles, {
            title: 'NewInmueblesInCiudades',
            exclude: ['id'],
            optional: ['ciudadesId']
          }),
        },
      },
    }) inmuebles: Omit<Inmuebles, 'id'>,
  ): Promise<Inmuebles> {
    return this.ciudadesRepository.inmuebles(id).create(inmuebles);
  }

  @patch('/ciudades/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Ciudades.Inmuebles PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmuebles, {partial: true}),
        },
      },
    })
    inmuebles: Partial<Inmuebles>,
    @param.query.object('where', getWhereSchemaFor(Inmuebles)) where?: Where<Inmuebles>,
  ): Promise<Count> {
    return this.ciudadesRepository.inmuebles(id).patch(inmuebles, where);
  }

  @del('/ciudades/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Ciudades.Inmuebles DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inmuebles)) where?: Where<Inmuebles>,
  ): Promise<Count> {
    return this.ciudadesRepository.inmuebles(id).delete(where);
  }
}
