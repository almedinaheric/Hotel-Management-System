import { Component } from '@angular/core';
import {LoginInformacije} from "../../Helpers/loginInformacije";
import {AutentifikacijaHelper} from "../../Helpers/autentifikacija";
import {Router, RouterModule, RouterLinkActive, NavigationEnd} from "@angular/router";
import {Korisnik} from "../../Helpers/korisnik";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../MojConfig";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  token:LoginInformacije;
  ovajKorisnik:any;
  uloga:any;

  constructor(private httpklijent:HttpClient, private router: Router) {
  }

  ngOnInit(){
    this.token=AutentifikacijaHelper.getLoginInfo();
    this.ProvjeriUlogu();
  }

  ProvjeriUlogu(){
    if(this.token.autentifikacijaToken.gost!=null) //niz provjera uloga korisnika
      this.ovajKorisnik=this.token.autentifikacijaToken.gost;
    else if(this.token.autentifikacijaToken.vlasnik!=null)
      this.ovajKorisnik=this.token.autentifikacijaToken.vlasnik;
    else
      this.ovajKorisnik=this.token.autentifikacijaToken.admin;
  }

  NaLandingPage()
  {
    this.router.navigate(['landingPage']);
  }

  Logout()
  {
    let token=MojConfig.http_opcije();
    // @ts-ignore
    AutentifikacijaHelper.setLoginInfo(null);
    localStorage.setItem('Working-user',"");
    this.httpklijent.post(MojConfig.adresa_servera+'/api/Korisnik/Logout', MojConfig.http_opcije()).subscribe(x=>{
      this.router.navigate(['/']);
    })
  }
}
