import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';

export class EstrategiaCliente implements AuthenticationStrategy{
name: string = 'cliente'
constructor(
  @service(AutenticacionService)
  public servicioAutenticacion:AutenticacionService
){

}

//38:55
async authenticate(request: Request): Promise<UserProfile | undefined> {
  let token=parseBearerToken(request);
  if (token){
    let datos =this.servicioAutenticacion.validarTokenJWT(token);
    if(datos){
      //.includes('administrador') min 37:30
      if(datos.data.rol=="cliente"){
        let perfil: UserProfile=Object.assign({
          nombre: datos.data.nombre
        });
        return perfil;
      }else{
        throw new HttpErrors[401]("No corresponde a un usuario cliente");
      }
      }else{
      throw new HttpErrors[401]("El token incluido no es valido")
    }
  }else{
    throw new HttpErrors[401]("No se incluyó un token en la solicitud")
  }
}
}

