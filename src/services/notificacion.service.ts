import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Llaves} from '../config/llaves';
import {MensajeCorreo, MensajeSms} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(/* Add @inject to inject parameters */) {}
  /*
   * Add service methods here
   */

  MensajeCorreo(mensaje: MensajeCorreo): Boolean{
    let link=`${Llaves.urlservicioNotificacion}/envio-correo?correo-destino=${mensaje.destinatario}&asunto=${mensaje.asunto}&contenido=${mensaje.contenido}`;
    fetch(link)
     .then((data: any) => {
      return true
     })
    return false;

  }
  Mensajesms(mensaje: MensajeSms): Boolean{
    //http://127.0.0.1:5000/sms?mensaje=prueba de sms desde programacion web LOZANO&telefono=3217101722
    let url = `${Llaves.urlservicioNotificacion}/sms?mensaje=${mensaje.mensaje}&telefono=${mensaje.telefono}`;
    fetch(url)
      .then((data:any)=>{
        return true
      });
    return false;

  }
}
