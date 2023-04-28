import { Component,Input } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MojConfig} from "../../../MojConfig";
import  {Soba} from "../../../Helpers/soba";
import { Observable } from 'rxjs';
import { groupBy, map, mergeMap, toArray } from 'rxjs/operators';
import { HotelDataService } from 'src/app/Helpers/hotel-data.service';


@Component({
  selector: 'app-dodane-sobe',
  templateUrl: './dodane-sobe.component.html',
  styleUrls: ['./dodane-sobe.component.css']
})
export class DodaneSobeComponent {
  dataLoaded:boolean = true;
  brisanjeUToku:boolean = false;
  rooms:any[]=[];
  hotelId:any;

  constructor(private httpklijent:HttpClient,private hotelDataService: HotelDataService) {}

  ngOnInit(){
    //@ts-ignore
    this.hotelId=JSON.parse(sessionStorage.getItem('idHotela'));
    this.fetchSobe();
  }

  Obrisi(roomId:any){
    if(confirm('Jeste li sigurni da zelite izbrisati sobu?')==true){
      this.brisanjeUToku=true;
      this.httpklijent.delete(MojConfig.adresa_servera+'/api/Soba/DeleteSobaById/'+roomId,MojConfig.http_opcije()).subscribe((x:any)=>{
        console.log("obrisana soba ", x);
        location.reload();
        this.brisanjeUToku=false;
      });
    }
  }

  fetchSobe():void{
    if(this.hotelId){
      this.dataLoaded=false;
      this.httpklijent.get<Soba>(MojConfig.adresa_servera+"/api/Soba/GetSobaByHotelId/"+this.hotelId,MojConfig.http_opcije()).subscribe((x:any) =>{
        this.rooms=x;
        this.dataLoaded=true;
      });
    }
  }
}
