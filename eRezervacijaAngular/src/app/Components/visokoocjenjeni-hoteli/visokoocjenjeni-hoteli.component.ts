import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Grad } from 'src/app/Helpers/grad';
import { Hotel } from 'src/app/Helpers/hotel';
import { MojConfig } from 'src/app/MojConfig';

@Component({
  selector: 'app-visokoocjenjeni-hoteli',
  templateUrl: './visokoocjenjeni-hoteli.component.html',
  styleUrls: ['./visokoocjenjeni-hoteli.component.css']
})
export class VisokoocjenjeniHoteliComponent {
  hoteli:any[]=[];
  dataLoaded:boolean = false;

  constructor(private httpklijent:HttpClient,private router:Router) {
  }
  
  fetchHoteli(){
    this.httpklijent.get(MojConfig.adresa_servera+'/api/Hotel/GetAllHotels',MojConfig.http_opcije()).subscribe((x:any) =>{
      this.dataLoaded=true;
      this.hoteli=x.sort(function(a:any,b:any){
        return b.prosjecnaOcjena-a.prosjecnaOcjena
      });
    });
  }

  logujId(id:any){
    this.router.navigate(['odabraniHotel',id,'fromLandingPage']);
  }

  getSlika(s:any){
    return "data:image/png;base64,"+s.slika
  }

  ngOnInit() :void{
    this.fetchHoteli();
  }
}
