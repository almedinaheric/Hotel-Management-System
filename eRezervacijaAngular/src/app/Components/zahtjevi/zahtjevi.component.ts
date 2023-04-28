import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../MojConfig";
import {map} from "rxjs/operators";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-zahtjevi',
  templateUrl: './zahtjevi.component.html',
  styleUrls: ['./zahtjevi.component.css']
})
export class ZahtjeviComponent {

  dataSource:any[]=[];
  displayedColumns:string[];

  constructor(private httpklijent: HttpClient) {
  }
  ngOnInit() {
    this.displayedColumns = ['hotel', 'adresa', 'actions'];
    this.httpklijent.get(MojConfig.adresa_servera+'/api/Hotel/GetUnlistedHotels').subscribe((x:any)=>{
      let noviniz=[];
      for (let i=0;i< x.length;i++){
        let novi={
          id:x[i].id,
          hotel:x[i].naziv,
          adresa:x[i].adresa,
        }
        noviniz.push(novi);
      }
    this.dataSource=noviniz;
    })
  }
  Odobri(s:any)
  {
    this.httpklijent.post(MojConfig.adresa_servera+'/api/Hotel/ListHotel?id='+s, null).subscribe((x:any)=>{
      location.reload();
    })
  }
}
