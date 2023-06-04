import { Component } from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {FormControl, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../MojConfig";
import {getMatIconFailedToSanitizeLiteralError} from "@angular/material/icon";
import { forkJoin, retryWhen } from 'rxjs';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  dataSource:any[]=[];
  dataSourceObjekat:any[]=[];
  displayedColumns:string[];
  displayedColumnsObjekat:string[];
  dataLoaded:any=false;
  gostId:any;
  hotel:any;

  constructor(private httpklijent: HttpClient) {
  }
  ngOnInit() {
    this.gostId=JSON.parse(localStorage.getItem('Working-user')||"").id;
    this.displayedColumns = ['pitanje', 'odgovor', 'datumOdgovoreno'];
    this.displayedColumnsObjekat = ['hotel','pitanje', 'odgovor', 'datumOdgovoreno'];

    this.fetchPitanjaVezanaZaObjekat();

    this.httpklijent.get(MojConfig.adresa_servera+'/api/Korisnik/GetPitanjaForGost?gostId='+this.gostId).subscribe((x:any)=>{
      let noviniz=[];
      for (let i=0;i< x.length;i++){
        let novi={
          tekstPitanja:x[i].tekstPitanja,
          odgovorPitanja:x[i].odgovorPitanja,
          datumOdgovoreno:new Date(x[i].datumOdgovoreno).toLocaleDateString(),
        }
        noviniz.push(novi);
      }
      this.dataSource=noviniz;
    })
  }

  fetchPitanjaVezanaZaObjekat(){
    this.httpklijent.get(MojConfig.adresa_servera+'/api/Hotel/GetPitanjaZaGosta/'+this.gostId,MojConfig.http_opcije()).subscribe((x:any)=>{
    let requests=[];
    for(let i=0;i<x.length;i++){
      requests.push(this.httpklijent.get(MojConfig.adresa_servera+'/api/Hotel/GetHotelByHotelId/'+x[i].hotelId,MojConfig.http_opcije()));
    }

    forkJoin(requests).subscribe((hotels:any)=>{
      let noviniz:any[] = [];
      for(let h in hotels){
        let novi={
          hotel:hotels[h].naziv,
          tekstPitanja:x[h].tekstPitanja,
          odgovorPitanja:x[h].odgovorPitanja,
          datumOdgovoreno:new Date(x[h].datumOdgovoreno).toLocaleDateString(),
        }
        noviniz.push(novi);
      }
      this.dataLoaded=true;
      this.dataSourceObjekat=noviniz;
    });
  });
  }
}
