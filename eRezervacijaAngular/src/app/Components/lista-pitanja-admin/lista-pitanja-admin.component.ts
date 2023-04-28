import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../MojConfig";

@Component({
  selector: 'app-lista-pitanja-admin',
  templateUrl: './lista-pitanja-admin.component.html',
  styleUrls: ['./lista-pitanja-admin.component.css']
})
export class ListaPitanjaAdminComponent {
  dataSource:any[]=[];
  displayedColumns:string[];
  tekstOdgovora:any;

  constructor(private httpklijent: HttpClient) {
  }
  ngOnInit() {
    this.displayedColumns = ['tekstPitanja', 'actions'];
    this.httpklijent.get(MojConfig.adresa_servera+'/api/Korisnik/GetNeodgovorenaPitanja').subscribe((x:any)=>{
      let noviniz=[];
      for (let i=0;i< x.length;i++){
        let novi={
          id:x[i].id,
          tekstPitanja:x[i].tekstPitanja,
        }
        noviniz.push(novi);
      }
      this.dataSource=noviniz;
    })
  }
  Odgovori(s:any){
    this.httpklijent.put(MojConfig.adresa_servera+'/api/Korisnik/OdgovoriPitanje/'+s+'?tekstOdgovora='+this.tekstOdgovora,null).subscribe((x:any)=>{
      location.reload();
    })
  }
}
