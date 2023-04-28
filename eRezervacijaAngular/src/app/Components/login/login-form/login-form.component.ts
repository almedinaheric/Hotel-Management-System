import { Component,Input } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {LoginInformacije} from "../../../Helpers/loginInformacije";
import { MojConfig } from 'src/app/MojConfig';
import { AutentifikacijaHelper } from 'src/app/Helpers/autentifikacija';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  @Input() OwnerGuestAdmin: string="User";
  url:string='';
  postLogin:string='dashboard';
  workingUser:any;
  token:any;

  constructor(private httpklijent: HttpClient, private router: Router) {
  }

  ngOnInit() {
  }

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  Validiraj() {
    if (this.username.hasError('required'))
      return false;
    if (this.password.hasError('required'))
      return false;
    return true;
  }

  ProvjeriUlogu(){
    if(this.token.autentifikacijaToken.gost!=null) //niz provjera uloga korisnika
      this.workingUser=this.token.autentifikacijaToken.gost;
    else if(this.token.autentifikacijaToken.vlasnik!=null)
      this.workingUser=this.token.autentifikacijaToken.vlasnik;
    else
      this.workingUser=this.token.autentifikacijaToken.admin;
  }

  Login() {
    if (!this.Validiraj()){
      //@ts-ignore
      porukaError("Morate unijeti podatke u sva input polja!");
      return;
    }
    let info = {
      username: this.username.value,
      password: this.password.value
    }

    if(this.OwnerGuestAdmin=='owner') {
      this.url=MojConfig.adresa_servera + '/api/Korisnik/LoginVlasnik';
    }
    else if(this.OwnerGuestAdmin=='guest') {
      this.url=MojConfig.adresa_servera + '/api/Korisnik/LoginGost';
      this.postLogin='landingPage';
    }
    else if(this.OwnerGuestAdmin=='admin') {
      this.url=MojConfig.adresa_servera + '/api/Korisnik/LoginAdmin';
    }

    this.httpklijent.post<LoginInformacije>(this.url, info,MojConfig.http_opcije()).subscribe((x: LoginInformacije) => {
      if (x.isLogiran == false) {
        // @ts-ignore
        porukaError("Pogresan username i/ili password");
      } else {
        AutentifikacijaHelper.setLoginInfo(x);
        this.token=AutentifikacijaHelper.getLoginInfo();
        this.router.navigate([this.postLogin]);
        this.ProvjeriUlogu();
        localStorage.setItem('Working-user', JSON.stringify(this.workingUser));
        // @ts-ignore
        porukaSuccess("Uspjesno ste se logirali!");
      }
    })
  }
}
