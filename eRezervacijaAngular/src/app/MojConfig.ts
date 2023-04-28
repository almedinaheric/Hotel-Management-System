import {HttpHeaders} from "@angular/common/http";
import {AutentifikacijaHelper} from "./Helpers/autentifikacija";
import {AutentifikacijaToken} from "./Helpers/loginInformacije";

export class MojConfig{
  static adresa_servera = "http://localhost:5280";
  //static adresa_servera="https://restapiexample.wrd.app.fit.ba"

  static http_opcije= function (){

    let autentifikacijaToken:AutentifikacijaToken = AutentifikacijaHelper.getLoginInfo().autentifikacijaToken;
    let mojtoken = "";

    if (autentifikacijaToken!=null)
      mojtoken = autentifikacijaToken.vrijednost;
    return {
      headers: {
        'autentifikacija-token': mojtoken,
      }
    };
  }

}
