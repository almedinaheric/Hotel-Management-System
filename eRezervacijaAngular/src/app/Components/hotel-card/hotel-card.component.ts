import {Component, Input,OnInit} from '@angular/core';
import {FF_MINUS} from "@angular/cdk/keycodes";
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.css']
})
export class HotelCardComponent {
  @Input() hotelName:string;
  @Input() starRating:number;
  @Input() description:string;
  @Input() image:any;
  @Input() grad:any;
  @Input() udaljenost:any;
  @Input() rating:any;
  @Input() hotelId:any;

  id:any;
  constructor(private router:Router){

  }

  getSlika(s:any){
    return "data:image/png;base64,"+s;
  }

  openHotelDetails(hotelId: any) {
    this.id=hotelId.id;
    this.router.navigate(['odabraniHotel', this.id,'fromCard']);
  }
}
