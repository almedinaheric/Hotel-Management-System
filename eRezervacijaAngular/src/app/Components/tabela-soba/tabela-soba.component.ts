import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../MojConfig";
import {getXHRResponse} from "rxjs/internal/ajax/getXHRResponse";

@Component({
  selector: 'app-tabela-soba',
  templateUrl: './tabela-soba.component.html',
  styleUrls: ['./tabela-soba.component.css']
})
export class TabelaSobaComponent {
  @Input() hotelId:any;
  @Output() sendData= new EventEmitter<any[]>();

  //@Input() brojGostiju:any;
  brojGostiju:any;
  protected readonly Math = Math;

  dataSource:any[]=[];
  displayedColumns:string[]=['tipSobe', 'kapacitet', 'cijena','broj'];
  columnsSum:any[]=[];
  itemZaCijenu:any;

  constructor(private httpKlijent: HttpClient) {
  }

  filter(element: any){
    return Object.entries(element.sobaDetalji).filter(a => a[1]);
  }

  ngOnInit() {
    this.httpKlijent.get(MojConfig.adresa_servera+`/api/Hotel/GetHotelRooms/${this.hotelId}`).subscribe((response:any)=>{
      this.dataSource=response;
      for (const row of this.dataSource) {
        let index=0;
        row.index=index;
        index++;
      }
    })
    this.brojGostiju=parseInt(sessionStorage.getItem('numGuests')||"");
  }

  Promjena(naziv:number, brojSoba:number, index:number,cijena:number)
  {
    for (const entry of this.columnsSum) {
      if(entry.index==index) {
        entry.brojSoba=brojSoba;
        return;
      }
    }
    const ukupnaCijena=cijena*brojSoba; 
    this.columnsSum.push({naziv,brojSoba,index,ukupnaCijena});
    this.sendData.emit(this.columnsSum);
  }
}
