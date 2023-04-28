import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../MojConfig";

@Component({
  selector: 'app-moje-rezervacije',
  templateUrl: './moje-rezervacije.component.html',
  styleUrls: ['./moje-rezervacije.component.css']
})
export class MojeRezervacijeComponent {
  displayedColumns: string[] = ['hotel', 'datumRezervisanja','checkIn','checkOut', 'brojGostiju','brojDjece','cijena'];
  dataSource = [];
  dataLoaded:boolean = false;

  constructor(private httpklijent: HttpClient) {
  }
  ngOnInit()
  {
    let vlasnikId=JSON.parse(localStorage.getItem("Working-user")||"").id;
    let uloga=JSON.parse(localStorage.getItem("Working-user")||"").korisnik.uloga;

    if(uloga=="Vlasnik"){
      this.httpklijent.get(MojConfig.adresa_servera+'/api/Korisnik/GetRezervacijeByVlasnikId?vlasnikId='+vlasnikId).subscribe((x:any)=>{
        this.dataLoaded=true;
        this.dataSource=x;
      })
    }
    else{
      this.httpklijent.get(MojConfig.adresa_servera+'/api/Korisnik/GetRezervacijeByGostId?gostId='+vlasnikId).subscribe((x:any)=>{
        this.dataLoaded=true;
        this.dataSource=x;
      })
    }


  }
}
