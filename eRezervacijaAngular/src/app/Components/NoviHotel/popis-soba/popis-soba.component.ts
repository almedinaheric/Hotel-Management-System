import { Component,Output,EventEmitter,Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MojConfig} from "../../../MojConfig";
import  {Soba} from "../../../Helpers/soba";
import { groupBy, map } from 'rxjs/operators';
import { HotelDataService } from 'src/app/Helpers/hotel-data.service';

@Component({
  selector: 'app-popis-soba',
  templateUrl: './popis-soba.component.html',
  styleUrls: ['./popis-soba.component.css']
})
export class PopisSobaComponent {
  postoji:boolean;
  rooms:any[]=[];
  currentIndex:any;
  hotelId:any;
  getSobe:any;

  constructor(private router: Router,private httpklijent:HttpClient,private hotelDataService: HotelDataService) {}

  @Output() postojiSoba=new EventEmitter<boolean>();

  dodajSobu() {
    this.router.navigate(['dodajHotel/addSoba']);
  }

  ngOnInit(){
    //@ts-ignore
    this.hotelId=JSON.parse(sessionStorage.getItem('idHotela'));
    this.fetchSobe();
  }

  fetchSobe():void{
    if(this.hotelId){
      this.httpklijent.get<Soba>(MojConfig.adresa_servera+"/api/Soba/GetSobaByHotelId/"+this.hotelId,MojConfig.http_opcije()).subscribe((x:any) =>{
        this.rooms=x;
        if(this.rooms.length>0){
          this.postoji=true;
        }
        else{
          this.postoji=false;
        }
        this.postojiSoba.emit(this.postoji);
      });
    }
  }
  
}
