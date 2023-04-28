import { Component, Input } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../MojConfig";
import {Router} from "@angular/router";
import {AutentifikacijaHelper} from "../../Helpers/autentifikacija";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() putanja:any;
  workingUser:any;
  token:any;

  @Input() svrha='';

  constructor(private httpklijent:HttpClient, private router:Router) {
  }

  ngOnInit(){
    this.token=AutentifikacijaHelper.getLoginInfo();
    this.ProvjeriUlogu();
    localStorage.setItem('Working-user', JSON.stringify(this.workingUser));
  }

  ProvjeriUlogu(){
    if(this.token.autentifikacijaToken.gost!=null) //niz provjera uloga korisnika
      this.workingUser=this.token.autentifikacijaToken.gost;
    else if(this.token.autentifikacijaToken.vlasnik!=null)
      this.workingUser=this.token.autentifikacijaToken.vlasnik;
    else
      this.workingUser=this.token.autentifikacijaToken.admin;
  }

  NaProfil()
  {
    this.router.navigate(['dashboard']);
  }
  Logout()
  {
    let token=MojConfig.http_opcije();
    // @ts-ignore
    AutentifikacijaHelper.setLoginInfo(null);
    this.httpklijent.post(MojConfig.adresa_servera+'/api/Korisnik/Logout', null, token).subscribe(x=>{
      this.router.navigate(['/']);
    });
  }

  DodajHotel(){
    // #TODO: URADITI DODAVANJE HOTELA
  }
}
