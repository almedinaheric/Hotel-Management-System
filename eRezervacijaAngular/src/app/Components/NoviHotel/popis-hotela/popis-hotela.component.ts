import { Component,Output,EventEmitter } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MojConfig} from "../../../MojConfig";
import { Router } from '@angular/router';

@Component({
  selector: 'app-popis-hotela',
  templateUrl: './popis-hotela.component.html',
  styleUrls: ['./popis-hotela.component.css']
})
export class PopisHotelaComponent {
  dataLoaded:boolean = false;
  brisanjeUToku:boolean = false;
  hotels:any[] = [];
  vlasnik:any;
  vlasnikId:any;
  postoji:any;

  constructor(private httpklijent:HttpClient,private router: Router){}
  
  @Output() postojiHotel = new EventEmitter<boolean>();

  ngOnInit(){
    //@ts-ignore
    this.vlasnik=JSON.parse(localStorage.getItem('Working-user'));
    this.vlasnikId=this.vlasnik.id;
    this.fetchHotele();
  }

  getSlika(hotel:any){
    return "data:image/png;base64,"+hotel.slika;
  }

  Obrisi(hotelId:any){
    if(confirm('Jeste li sigurni da zelite izbrisati hotel?')==true){
      this.brisanjeUToku=true;
      this.httpklijent.delete(MojConfig.adresa_servera+'/api/Hotel/DeleteHotelById/'+hotelId,MojConfig.http_opcije()).subscribe((x:any)=>{
        location.reload();
        this.brisanjeUToku=false;
      });
    }
  }

  Uredi(hotel:any){
    sessionStorage.setItem("hotel",JSON.stringify(hotel));
    this.router.navigate(['pregledHotela']);
  }

  fetchHotele():void{
    this.httpklijent.get(MojConfig.adresa_servera+"/api/Hotel/GetHotelByVlasnikId/"+this.vlasnikId,MojConfig.http_opcije()).subscribe((x:any) =>{
      this.dataLoaded=true;
      this.hotels=x;
      if(x.length>0){
        this.postoji=true;
      }
      else{
        this.postoji=false;
      }
      this.postojiHotel.emit(this.postoji);
    });
  }

}
