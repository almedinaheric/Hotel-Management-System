import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SobaDataService {
  private sobaData: any;
  private sobaIds: Array<number> = [];

  setSobaData(data: any) {
    this.sobaData = data;
    this.sobaIds.push(data.id); 
  }

  getSobaData() {
    if(this.sobaData){
      return this.sobaData;
    }
    else{
      return 0;
    }
  }

  getSobaIds() {
    return this.sobaIds;
  }

  clearSobaData() {
    this.sobaData = null;
    this.sobaIds.splice(0, this.sobaIds.length);
  }
}
