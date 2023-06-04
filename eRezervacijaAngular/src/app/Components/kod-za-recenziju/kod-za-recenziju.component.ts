import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../MojConfig";
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { DodajRecenzijuComponent } from '../dodaj-recenziju/dodaj-recenziju.component';

@Component({
  selector: 'app-kod-za-recenziju',
  templateUrl: './kod-za-recenziju.component.html',
  styleUrls: ['./kod-za-recenziju.component.css']
})
export class KodZaRecenzijuComponent {
  input='';
  warning=false;
  gostId:any;
  hotelId:any;
  WarningContent="Morate unijeti broj rezervacije, tako osiguravamo da recenzije mogu dodati samo osobe koje su odsjele u hotelu!";

  constructor(private httpklijent: HttpClient,public dialog: MatDialog,
    public dialogRef: MatDialogRef<KodZaRecenzijuComponent>){}

  ngOnInit(){
    this.gostId=JSON.parse(localStorage.getItem('Working-user')||"").id;
    this.hotelId=sessionStorage.getItem('hotelId');
  }

  dodajRecenziju(){
    if(this.input.length>0){
      this.httpklijent.post(MojConfig.adresa_servera+`/api/Korisnik/CheckIfGuidExists?hotelId=${this.hotelId}&brojRezervacije=${this.input}`, MojConfig.http_opcije()).subscribe((x:any)=>{
        if(x==true){
          this.warning=false;
          this.dialogRef.close();
          const dialogRef = this.dialog.open(DodajRecenzijuComponent, {
            width: '40rem'
          });
        }
        else{
          this.WarningContent='Netačan broj rezervacije! Molimo pokušajte ponovo!';
          this.warning=true;
        }
      });
    }
    else{
      this.WarningContent="Morate unijeti broj rezervacije, tako osiguravamo da recenzije mogu dodati samo osobe koje su odsjele u hotelu!";
      this.warning=true;
    }
  }
}