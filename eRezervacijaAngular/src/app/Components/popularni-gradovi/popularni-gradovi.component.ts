import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MojConfig} from "../../MojConfig";
import {Router} from "@angular/router";
import {Grad} from "../../Helpers/grad";

@Component({
  selector: 'app-popularni-gradovi',
  templateUrl: './popularni-gradovi.component.html',
  styleUrls: ['./popularni-gradovi.component.css']
})
export class PopularniGradoviComponent {
  gradovi: Grad[]=[];
  dataLoaded:boolean = false;

  constructor(private httpklijent:HttpClient,private router:Router) {
  }

  fetchGradovi():void{
    this.httpklijent.get<Grad>(MojConfig.adresa_servera+"/api/Grad/GetAll",MojConfig.http_opcije()).subscribe((x:any) =>{
      //Sortirani gradovi u opadajucem prema broju hotela (samo oni koji imaju slike)
      this.dataLoaded=true;
      this.gradovi = x.filter((grad: any) => grad.slika !== null)
      .sort(function(a:any,b:any){
        return b.brojHotelaUGradu-a.brojHotelaUGradu
      })
    });
  }
    
  getSlika(s:any){
    return "data:image/png;base64,"+s.slika
  }

  ngOnInit() :void{
    this.fetchGradovi();
  }
}
