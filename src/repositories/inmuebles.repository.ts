import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Inmuebles, InmueblesRelations, Ciudades, Solicitudes} from '../models';
import {CiudadesRepository} from './ciudades.repository';
import {SolicitudesRepository} from './solicitudes.repository';

export class InmueblesRepository extends DefaultCrudRepository<
  Inmuebles,
  typeof Inmuebles.prototype.id,
  InmueblesRelations
> {

  public readonly ciudades: BelongsToAccessor<Ciudades, typeof Inmuebles.prototype.id>;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitudes, typeof Inmuebles.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CiudadesRepository') protected ciudadesRepositoryGetter: Getter<CiudadesRepository>, @repository.getter('SolicitudesRepository') protected solicitudesRepositoryGetter: Getter<SolicitudesRepository>,
  ) {
    super(Inmuebles, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudesRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.ciudades = this.createBelongsToAccessorFor('ciudades', ciudadesRepositoryGetter,);
    this.registerInclusionResolver('ciudades', this.ciudades.inclusionResolver);
  }
}
