import { Component } from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {FormControl, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../MojConfig";
import {getMatIconFailedToSanitizeLiteralError} from "@angular/material/icon";

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {

  dataSource:any[]=[];
  displayedColumns:string[];

  constructor(private httpklijent: HttpClient) {
  }
  ngOnInit() {
    let gostid=JSON.parse(localStorage.getItem('Working-user')||"").id;
    this.displayedColumns = ['pitanje', 'odgovor', 'datumOdgovoreno'];
    this.httpklijent.get(MojConfig.adresa_servera+'/api/Korisnik/GetPitanjaForGost?gostId='+gostid).subscribe((x:any)=>{
      let noviniz=[];
      console.log(x);
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
}
