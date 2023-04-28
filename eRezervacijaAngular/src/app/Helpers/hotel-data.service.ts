import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotelDataService {
  private hotelData: any;

  setHotelData(data: any) {
    this.hotelData = data;
  }

  getHotelData() {
    return this.hotelData;
  }
  
  clearHotelData() {
    this.hotelData = null;
  }
}
