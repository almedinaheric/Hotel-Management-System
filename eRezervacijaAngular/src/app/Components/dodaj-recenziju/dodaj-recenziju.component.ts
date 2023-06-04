import { Component,Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MojConfig } from 'src/app/MojConfig';

@Component({
  selector: 'app-dodaj-recenziju',
  templateUrl: './dodaj-recenziju.component.html',
  styleUrls: ['./dodaj-recenziju.component.css']
})

export class DodajRecenzijuComponent {
  input='';
  preostaloZnakova:number=150;
  maxZnakova=150;
  warning=false;
  hotelId:any;
  gostId:any;

  @Input('rating')  rating: number = 3;
  @Input('starCount')  starCount: number = 5;
  @Input('color')  color: string = 'accent';
  

  constructor(public dialogRef: MatDialogRef<DodajRecenzijuComponent>,private httpKlijent:HttpClient) {
    this.hotelId=sessionStorage.getItem('hotelId');
    this.gostId=JSON.parse(localStorage.getItem('Working-user')||"").id;

    enum StarRatingColor {
      primary = "primary",
      accent = "accent",
      warn = "warn"
    }
   }

   onRatingChanged(rating:any){
    this.rating = rating;
  }
  
  prebrojiZnakove(){
    this.preostaloZnakova=this.maxZnakova-this.input.length;
  }

  dodajRecenziju(){
    const nova={
      hotelId:this.hotelId,
      gostId:this.gostId,
      ocjena:this.rating,
      komentar:this.input
    };

    this.httpKlijent.post(MojConfig.adresa_servera+'/api/Korisnik/DodajRecenziju',nova,MojConfig.http_opcije()).subscribe((x:any)=>{
      sessionStorage.removeItem('hotelId');
      this.dialogRef.close();
      location.reload();
      //@ts-ignore
      porukaSuccess("Uspjesno ste dodali recenziju!");

    },(err)=>{
      //@ts-ignore
      porukaError("greska");
    });
  }
}
