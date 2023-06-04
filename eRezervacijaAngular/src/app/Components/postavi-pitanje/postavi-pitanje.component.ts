import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MojConfig } from 'src/app/MojConfig';

@Component({
  selector: 'app-postavi-pitanje',
  templateUrl: './postavi-pitanje.component.html',
  styleUrls: ['./postavi-pitanje.component.css']
})
export class PostaviPitanjeComponent {
  input='';
  preostaloZnakova:number=300;
  maxZnakova=300;
  warning=false;

  constructor(public dialogRef: MatDialogRef<PostaviPitanjeComponent>,private httpKlijent:HttpClient) { }

  prebrojiZnakove(){
    this.preostaloZnakova=this.maxZnakova-this.input.length;
  }

  posaljiPitanje(){
    if(this.input.length>0){
      let gostid=JSON.parse(localStorage.getItem('Working-user')||"").id;
      let hotel=sessionStorage.getItem('hotelId');
      
      let novoPitanje={
        tekstPitanja:this.input,
        gostID:gostid,
        hotelID:hotel
      }
      
      this.httpKlijent.post(MojConfig.adresa_servera+'/api/Hotel/PostaviPitanje',novoPitanje,MojConfig.http_opcije()).subscribe((x:any)=>{
        //@ts-ignore
        porukaSuccess("Uspjesno ste poslali poruku, odgovor ćete dobiti u najskorijem mogućem roku, u sekciji Moja Pitanja na Vašem profilu! Hvala!");
        this.warning=false;
        sessionStorage.removeItem('hotelId');
        this.dialogRef.close();
      });
    }
    else{
      this.warning=true;
    }
  }
}
