import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Ciudades} from '../models';
import {CiudadesRepository} from './ciudades.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id,
  DepartamentoRelations
> {

  public readonly ciudades: HasManyRepositoryFactory<Ciudades, typeof Departamento.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CiudadesRepository') protected ciudadesRepositoryGetter: Getter<CiudadesRepository>,
  ) {
    super(Departamento, dataSource);
    this.ciudades = this.createHasManyRepositoryFactoryFor('ciudades', ciudadesRepositoryGetter,);
    this.registerInclusionResolver('ciudades', this.ciudades.inclusionResolver);
  }
}
