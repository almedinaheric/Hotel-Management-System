import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moji-objekti',
  templateUrl: './moji-objekti.component.html',
  styleUrls: ['./moji-objekti.component.css']
})
export class MojiObjektiComponent {
  postojiHotel:boolean;
  vlasnikId:any;

  constructor(private router:Router){}

  DaLiHotelPostoji(postoji:boolean){
    this.postojiHotel=postoji;
  }

  toAddHotel(){
    this.router.navigate(['/dodajHotel/addHotel',0]);
  }
}
