import { Component } from '@angular/core';
import { HotelDataService } from 'src/app/Helpers/hotel-data.service';
import { SobaDataService } from 'src/app/Helpers/soba-data.service';

@Component({
  selector: 'app-dodaj-hotel',
  templateUrl: './dodaj-hotel.component.html',
  styleUrls: ['./dodaj-hotel.component.css']
})
export class DodajHotelComponent {

  constructor(private hotelDataService: HotelDataService,private sobaDataService:SobaDataService) {}
  
  onClose(){
    sessionStorage.clear();
      this.hotelDataService.clearHotelData();
      this.sobaDataService.clearSobaData();
  }
}
