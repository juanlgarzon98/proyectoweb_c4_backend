import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Usuarios} from '../models';
import {UsuariosRepository} from '../repositories';
const generador=require("password-generator");
const cryptoJS=require("crypto-js");

const jwt=require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */
    @repository(UsuariosRepository)
    public usuariosRepository : UsuariosRepository
    ) {}

  /*
   * Add service methods here
   */

  GenerarClave(){
    let clave = generador(8,false);
    return clave;
    }
  CifrarClave(clave: string){
    let claveCifrada=cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarUsuario(correo: string, clave: string){
    try {
      let clavecifrada=this.CifrarClave(clave);
      let u=this.usuariosRepository.findOne({where: {email: correo, contrasena: clavecifrada}});
      if (u) {
        return u;
      }
      return false;
    } catch{
      return false;
    }
    }

    IdentificarARestaurar(correo: string){
      try {
        let u=this.usuariosRepository.findOne({where: {email: correo}});
        if (u) {
          return u;
        }
        return false;
      } catch{
        return false;
      }
      }


    GenerarTokenJWT(usuario: Usuarios){
      let token= jwt.sign({
        data:{
          id:usuario.id,
          correo: usuario.email,
          nombre: usuario.nombres + usuario.apellidos,
          rol: usuario.rol
        },
      },
      Llaves.claveJWT);
      return token;
      }


      validarTokenJWT(token: string){
        try {
          let datos= jwt.verify(token, Llaves.claveJWT);
          return datos;
        } catch{
        return false;
        }


        }





}
