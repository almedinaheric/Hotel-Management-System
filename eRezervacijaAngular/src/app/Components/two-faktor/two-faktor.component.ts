import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MojConfig} from "../../MojConfig";
import {FormControl} from "@angular/forms";
import {AutentifikacijaHelper} from "../../Helpers/autentifikacija";
import {LoginInformacije} from "../../Helpers/loginInformacije";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-two-faktor',
  templateUrl: './two-faktor.component.html',
  styleUrls: ['./two-faktor.component.css']
})
export class TwoFaktorComponent {
  code=new FormControl('');
  workingUser:any;
  token:any;
  postLogin:string="dashboard";
  constructor(private httpKlijent: HttpClient, private router: Router, public dialogRef: MatDialogRef<TwoFaktorComponent>){}

  ngOnInit(): void {
  }

  ProvjeriUlogu(){
    //niz provjera uloga korisnika
    if(this.token.autentifikacijaToken.gost!=null){
      this.workingUser=this.token.autentifikacijaToken.gost;
      this.postLogin="landingPage";
    }
    else if(this.token.autentifikacijaToken.vlasnik!=null)
      this.workingUser=this.token.autentifikacijaToken.vlasnik;
    else
      this.workingUser=this.token.autentifikacijaToken.admin;
  }
  
  otkljucaj() {
    let config=MojConfig.http_opcije();
    this.httpKlijent.get<LoginInformacije>(MojConfig.adresa_servera+ "/api/Korisnik/Otkljucaj/" + this.code.value, config).subscribe((x:LoginInformacije)=>{
      let currentToken=AutentifikacijaHelper.getLoginInfo();
      if(currentToken.autentifikacijaToken.vrijednost==x.autentifikacijaToken.vrijednost)
      {
        x.autentifikacijaToken.gost=currentToken.autentifikacijaToken?.gost;
        x.autentifikacijaToken.admin=currentToken.autentifikacijaToken?.admin;
        x.autentifikacijaToken.vlasnik=currentToken.autentifikacijaToken?.vlasnik;
      }
      AutentifikacijaHelper.setLoginInfo(x);
      this.token=AutentifikacijaHelper.getLoginInfo();
      this.ProvjeriUlogu();
      localStorage.setItem('Working-user', JSON.stringify(this.workingUser));
      // @ts-ignore
      porukaSuccess("Uspjesno ste se logirali!");
      this.router.navigate([this.postLogin]);
      this.dialogRef.close();
    });
  }
}
