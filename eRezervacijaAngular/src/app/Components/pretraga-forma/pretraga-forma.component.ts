import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MojConfig} from "../../MojConfig";
import { Grad } from 'src/app/Helpers/grad';
import { FormControl, Validators } from '@angular/forms';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-pretraga-forma',
  templateUrl: './pretraga-forma.component.html',
  styleUrls: ['./pretraga-forma.component.css']
})
export class PretragaFormaComponent {
  gradovi:Grad[]=[];
  numGuests:number;
  numChildren:number;
  numRooms:number;
  dateRange:any;
  dateStart:any;
  dateEnd:any;
  value:any;
  searchTerm=new FormControl('',Validators.required);

  constructor(private httpKlijent:HttpClient, private router:Router, private datePipe:DatePipe) {
    this.getGrad();
  }

  Search(){
    this.dateStart=this.datePipe.transform(new Date(this.dateStart), 'yyyy-MM-dd');
    this.dateEnd=this.datePipe.transform(new Date(this.dateEnd), 'yyyy-MM-dd');
    //this.dateStart=new Date(this.dateStart).toLocaleDateString();
    //this.dateEnd=new Date(this.dateEnd).toISOString().slice(0,10);
    this.httpKlijent.get(MojConfig.adresa_servera +
      `/api/Hotel/Search?grad=${this.searchTerm.value}&datumCheckIn=${this.dateStart}&datumCheckOut=${this.dateEnd}&brojGostiju=${this.numGuests}&brojSoba=${this.numRooms}`).subscribe((response: any) => {
      sessionStorage.setItem('search-results', JSON.stringify(response));
      let dateRange={
        dateStart:this.dateStart,
        dateEnd:this.dateEnd
      }
      sessionStorage.setItem('dateRange', JSON.stringify(dateRange));
      this.router.navigate(['searchResults']);
    });

    //@ts-ignore
    sessionStorage.setItem('gradPretraga',this.searchTerm.value);
    //@ts-ignore
    sessionStorage.setItem('numGuests',this.numGuests);
    //@ts-ignore
    sessionStorage.setItem('numRooms',this.numRooms);
  }

  getGrad(){
    this.httpKlijent.get<Grad[]>(MojConfig.adresa_servera+ '/api/Grad/GetAll',MojConfig.http_opcije()).subscribe(x=>{
      this.gradovi=x.sort((a,b)=>{
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
    });
  })
  }
}
