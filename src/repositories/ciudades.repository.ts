import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Ciudades, CiudadesRelations, Departamento, Inmuebles} from '../models';
import {DepartamentoRepository} from './departamento.repository';
import {InmueblesRepository} from './inmuebles.repository';

export class CiudadesRepository extends DefaultCrudRepository<
  Ciudades,
  typeof Ciudades.prototype.id,
  CiudadesRelations
> {

  public readonly departamento: BelongsToAccessor<Departamento, typeof Ciudades.prototype.id>;

  public readonly inmuebles: HasManyRepositoryFactory<Inmuebles, typeof Ciudades.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('InmueblesRepository') protected inmueblesRepositoryGetter: Getter<InmueblesRepository>,
  ) {
    super(Ciudades, dataSource);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmueblesRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
  }
}
