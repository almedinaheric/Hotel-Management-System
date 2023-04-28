import { Component } from '@angular/core';
import {AutentifikacijaHelper} from "../../Helpers/autentifikacija";
import {Router} from "@angular/router";
import {MojConfig} from "../../MojConfig";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  constructor(private httpKlijent:HttpClient, private router:Router) {
  }

  ngOnInit(){
  }
  tekstPitanja:any;

  PostaviPitanje()
  {
    if(this.tekstPitanja=='')
      return;
    let gostid=JSON.parse(localStorage.getItem('Working-user')||"").id;
    let novoPitanje={
      tekstPitanja:this.tekstPitanja,
      gostID:gostid
    }
    this.httpKlijent.post(MojConfig.adresa_servera+'/api/Korisnik/PostaviPitanje',novoPitanje).subscribe((x:any)=>{
      alert('Hvala na pitanju!\nOdgovor će Vam u najskorijem mogućem roku biti vidljiv u sekciji "Moja pitanja" na profilu!');
      location.reload();
    })
  }
}
