import { /* inject, */ BindingScope, injectable} from '@loopback/core';
const cryptoJS=require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class RestaurarpassService {
  constructor(/* Add @inject to inject parameters */) {}


restaurarContraseña(){


}


  /*
   * Add service methods here
   */
}
