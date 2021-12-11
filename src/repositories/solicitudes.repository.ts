import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Solicitudes, SolicitudesRelations, Inmuebles, Usuarios} from '../models';
import {InmueblesRepository} from './inmuebles.repository';
import {UsuariosRepository} from './usuarios.repository';

export class SolicitudesRepository extends DefaultCrudRepository<
  Solicitudes,
  typeof Solicitudes.prototype.id,
  SolicitudesRelations
> {

  public readonly inmuebles: BelongsToAccessor<Inmuebles, typeof Solicitudes.prototype.id>;

  public readonly usuarios: BelongsToAccessor<Usuarios, typeof Solicitudes.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InmueblesRepository') protected inmueblesRepositoryGetter: Getter<InmueblesRepository>, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(Solicitudes, dataSource);
    this.usuarios = this.createBelongsToAccessorFor('usuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
    this.inmuebles = this.createBelongsToAccessorFor('inmuebles', inmueblesRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
  }
}
