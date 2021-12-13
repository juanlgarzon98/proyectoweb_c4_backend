import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Llaves} from '../config/llaves';
import {Credenciales, MensajeCorreo, MensajeSms, Usuarios} from '../models';
import {UsuariosRepository} from '../repositories';
import {AutenticacionService, NotificacionService} from '../services';
const fetch=require('node-fetch');
export class UsuariosController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository : UsuariosRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
    @service(NotificacionService)
    public servicioNotificacion: NotificacionService

  ) {}



@post("/identificarUsuarios",{
    responses:{
      //18:37
      '200':{
        description: 'Identificacion de usuarios'
      }
    }
    })
    async identificarUsuarios(
      @requestBody() credenciales:Credenciales
      ){
        let clavecifrada=this.servicioAutenticacion.CifrarClave(credenciales.clave);
        //console.log("email:"+credenciales.usuario)
        //console.log("clave cifrada:"+clavecifrada)
        let p= await this.servicioAutenticacion.IdentificarUsuario(credenciales.usuario,clavecifrada);
        if(p){
          let token = this.servicioAutenticacion.GenerarTokenJWT(p);
          return {
            datos: {
              nombres: p.nombres,
              correo: p.email,
              id: p.id,
              rol: p.rol,
            },
            tk: token
          }
          }else{
            throw new HttpErrors[401]("Datos invalidos")
          }
      }



@post("/contacto",{
    responses:{
      //18:37
      '200':{
        description: 'Identificacion de usuarios'
      }
    }
    })
    async enviarCorreo(
      @requestBody() objeto:{nombres:string,mensaje:string,remitente:string}
      ){
        let correo = new MensajeCorreo();
        correo.destinatario="juan98.lozanog@mail.com";
        correo.asunto="Contacto";
        correo.contenido=`${objeto.nombres}:<br/>${objeto.remitente}:<br/>${objeto.mensaje}`;
        this.servicioNotificacion.MensajeCorreo(correo);
        /*
        let sms = new MensajeSms();
        sms.telefono='3208994674';
        sms.mensaje=`Mensaje de ${objeto.nombres}: (${objeto.remitente}):\n${objeto.mensaje}`;
        this.servicioNotificacion.Mensajesms(sms);
        */
      }

@post("/identificarUsuario",{
    responses:{
      //18:37
      '200':{
        description: 'Identificacion de usuarios'
      }
    }
    })
    async identificarUsuario(
      @requestBody() credenciales:Credenciales
      ): Promise<Usuarios>{
        let clavecifrada=this.servicioAutenticacion.CifrarClave(credenciales.clave);
        //console.log("email:"+credenciales.usuario)
        //console.log("clave cifrada:"+clavecifrada)
        let p= await this.usuariosRepository.findOne({where: {email: credenciales.usuario, contrasena: clavecifrada}});
        if(p){
          return p;
          }else{
            throw new HttpErrors[401]("Datos invalidos")
          }
      }

@post("/restaurarContrasena",{
  responses:{
    '200':{
      descripion:"Recuperacion de clave de usuarios"
    }
  }
})
async recuperarClave(
  @requestBody() objeto:{correo:string}
): Promise<Boolean>{
  let usuario = await this.usuariosRepository.findOne({
    where:{
      email:objeto.correo,
    }
  });
  if(usuario){
    let clave = this.servicioAutenticacion.GenerarClave();
    //console.log(clave);
    let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
    console.log(claveCifrada);
    usuario.contrasena = claveCifrada;
    await this.usuariosRepository.updateById(usuario.id, usuario);

   // http://127.0.0.1:5000/

   let correo = new MensajeCorreo();
   correo.destinatario=usuario.email;
   correo.asunto="Restaurar contraseña";
   correo.contenido=`Hola ${usuario.nombres}<br/>Se ha restaurado su contraseña<br/>Nueva contraseña: ${clave}`;
   this.servicioNotificacion.MensajeCorreo(correo);

    // enviar clave por SMS
    let sms = new MensajeSms();
    sms.telefono=usuario.telefono;
    sms.mensaje=`Hola ${usuario.nombres}\nSe a recuperado su contraseña\nnueva contraseña: ${clave}`;
    this.servicioNotificacion.Mensajesms(sms);

    return true;
  }else{
    console.log('error');
    throw new HttpErrors[401]("Datos invalidos")
  }

}





//heroku / docker
  @authenticate.skip()
  @post('/usuarios')
  @response(200, {
    description: 'Usuarios model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuarios',
            exclude: ['id'],
          }),
        },
      },
    })
    usuarios: Omit<Usuarios, 'id'>,
  ): Promise<Usuarios> {
    //let clave=this.servicioAutenticacion.GenerarClave();
    let clave;
    clave=usuarios.contrasena;
    let claveCifrada;
    if(clave!=null){
      claveCifrada=this.servicioAutenticacion.CifrarClave(clave);
    }else{
      clave=this.servicioAutenticacion.GenerarClave();
      claveCifrada=this.servicioAutenticacion.CifrarClave(clave);
    }

    usuarios.contrasena=claveCifrada;

    let u= await this.usuariosRepository.create(usuarios);

    //Notificar usuario http://127.0.0.1:5000/
    let destino=usuarios.email;
    let asunto="registro en plataforma";
    let contenido=`Hola ${usuarios.nombres} ${usuarios.rol}, su usuario es ${usuarios.email}, su pass es ${clave}`;
      fetch(`${Llaves.urlservicioNotificacion}/envio-correo?correo-destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
          //console.log(data);
      })
    let sms = new MensajeSms();
    sms.telefono=usuarios.telefono;
    sms.mensaje=`Hola ${usuarios.nombres}\nSu usuario es ${usuarios.email}, su pass es ${clave}`;
    this.servicioNotificacion.Mensajesms(sms);

    return u;
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuarios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuarios) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.usuariosRepository.count(where);
  }

  @authenticate("admin")
  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuarios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuarios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuarios) filter?: Filter<Usuarios>,
  ): Promise<Usuarios[]> {
    return this.usuariosRepository.find(filter);
  }


  @patch('/usuarios')
  @response(200, {
    description: 'Usuarios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Usuarios,
    @param.where(Usuarios) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.usuariosRepository.updateAll(usuarios, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuarios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuarios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuarios, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuarios>
  ): Promise<Usuarios> {
    return this.usuariosRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Usuarios,
  ): Promise<void> {
    await this.usuariosRepository.updateById(id, usuarios);
  }

  @authenticate.skip()
  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuarios: Usuarios,
  ): Promise<void> {
    let nuevapass=this.servicioAutenticacion.CifrarClave(usuarios.contrasena);
    usuarios.contrasena=nuevapass;
    console.log(usuarios.contrasena);
    await this.usuariosRepository.replaceById(id, usuarios);
  }

  @authenticate("admin")
  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuariosRepository.deleteById(id);
  }
}
