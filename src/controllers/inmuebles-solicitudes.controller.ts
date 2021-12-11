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
  Inmuebles,
  Solicitudes,
} from '../models';
import {InmueblesRepository} from '../repositories';

export class InmueblesSolicitudesController {
  constructor(
    @repository(InmueblesRepository) protected inmueblesRepository: InmueblesRepository,
  ) { }

  @get('/inmuebles/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Array of Inmuebles has many Solicitudes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitudes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Solicitudes>,
  ): Promise<Solicitudes[]> {
    return this.inmueblesRepository.solicitudes(id).find(filter);
  }

  @post('/inmuebles/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Inmuebles model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitudes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inmuebles.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitudes, {
            title: 'NewSolicitudesInInmuebles',
            exclude: ['id'],
            optional: ['inmueblesId']
          }),
        },
      },
    }) solicitudes: Omit<Solicitudes, 'id'>,
  ): Promise<Solicitudes> {
    return this.inmueblesRepository.solicitudes(id).create(solicitudes);
  }

  @patch('/inmuebles/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Inmuebles.Solicitudes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitudes, {partial: true}),
        },
      },
    })
    solicitudes: Partial<Solicitudes>,
    @param.query.object('where', getWhereSchemaFor(Solicitudes)) where?: Where<Solicitudes>,
  ): Promise<Count> {
    return this.inmueblesRepository.solicitudes(id).patch(solicitudes, where);
  }

  @del('/inmuebles/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Inmuebles.Solicitudes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Solicitudes)) where?: Where<Solicitudes>,
  ): Promise<Count> {
    return this.inmueblesRepository.solicitudes(id).delete(where);
  }
}
