import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../MojConfig";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-lista-pitanja-vlasnik',
  templateUrl: './lista-pitanja-vlasnik.component.html',
  styleUrls: ['./lista-pitanja-vlasnik.component.css']
})
export class ListaPitanjaVlasnikComponent {
  dataSource:any[]=[];
  displayedColumns:string[];
  tekstOdgovora:any;
  vlasnikId:any;
  hotelIdevi:any[]=[];
  noviniz:any[]=[];

  constructor(private httpklijent: HttpClient) {
  }

  ngOnInit() {
    this.displayedColumns = ['tekstPitanja', 'actions'];
    this.vlasnikId=JSON.parse(localStorage.getItem('Working-user')||"").id;
    this.fetchHoteliId();
  }
  
  Odgovori(s:any){
    this.httpklijent.put(MojConfig.adresa_servera+'/api/Hotel/OdgovoriPitanje/'+s+'?tekstOdgovora='+this.tekstOdgovora,null).subscribe((x:any)=>{
      location.reload();
    })
  }

  fetchHoteliId() {
    this.httpklijent.get(MojConfig.adresa_servera + '/api/Hotel/GetHotelByVlasnikId/' + this.vlasnikId, MojConfig.http_opcije()).subscribe((x: any) => {
      let hotels = x;
      const requests = [];

      for (let hotel of hotels) {
        requests.push(this.httpklijent.get(MojConfig.adresa_servera + '/api/Hotel/GetNeodgovorenaPitanja/' + hotel.id, MojConfig.http_opcije()));
      }

      forkJoin(requests).subscribe((responses: any[]) => {
        const noviniz = [];

        for (let i = 0; i < responses.length; i++) {
          const pitanja = responses[i];
          for (let j = 0; j < pitanja.length; j++) {
            noviniz.push({
              id: pitanja[j].id,
              tekstPitanja: pitanja[j].tekstPitanja,
            });
          }
        }
        this.dataSource = noviniz;
      });
    });
  }
}

