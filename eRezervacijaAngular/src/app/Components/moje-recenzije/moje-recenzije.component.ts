import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../MojConfig";
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-moje-recenzije',
  templateUrl: './moje-recenzije.component.html',
  styleUrls: ['./moje-recenzije.component.css']
})
export class MojeRecenzijeComponent {
  dataSource:any[]=[];
  displayedColumns:string[];
  uloga:any;
  dataLoaded:boolean = false;

  constructor(private httpklijent: HttpClient) {
  }

  ngOnInit()
  {
    //@ts-ignore
    let user=JSON.parse(localStorage.getItem(("Working-user")));
    this.uloga=user.korisnik.uloga;
    let userId=user.id;
    let hotels:any;
    let hotelId:any;
    
    if(this.uloga=="Vlasnik"){
      this.displayedColumns = ['hotel', 'person', 'rating', 'comment'];
      this.httpklijent.get(MojConfig.adresa_servera+"/api/Hotel/GetHotelByVlasnikId/"+userId,MojConfig.http_opcije()).subscribe((x:any) =>{
        hotels=x;
        this.dataLoaded=true;
        
        const getRecenzijeRequest = hotels.map((hotel:any) => {
          return this.httpklijent.get(MojConfig.adresa_servera+'/api/Korisnik/GetRecenzijeByHotelId?hotelId='+hotel.id).pipe(
            map((recenzije: any) => {
              if (recenzije.length != 0) {
                return recenzije;
              } else {
                return [];
              }
            }));
          });
          
          //forkJoin -> ceka se da se preuzmu sve recenzije za sve hotele
          //map -> pregleda sve nizove i filtrira one koji su prazni
          //flat -> sve nizove stavlja u jedan niz
          
          forkJoin(getRecenzijeRequest).subscribe((results: any) => {
            this.dataLoaded=true;
            this.dataSource = results.flat();
          });
        });
      }
      else{
      this.displayedColumns = ['hotel', 'rating', 'comment'];
      this.httpklijent.get(MojConfig.adresa_servera+'/api/Korisnik/GetRecenzijeByGostId?gostId='+userId).subscribe((x:any)=>{
        this.dataLoaded=true;
        this.dataSource=x;
        });
    }
  }
}