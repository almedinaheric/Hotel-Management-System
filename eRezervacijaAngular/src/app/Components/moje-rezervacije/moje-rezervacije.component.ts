import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../MojConfig";
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { PrikaziBrojRezervacijeComponent } from '../prikazi-broj-rezervacije/prikazi-broj-rezervacije.component';

@Component({
  selector: 'app-moje-rezervacije',
  templateUrl: './moje-rezervacije.component.html',
  styleUrls: ['./moje-rezervacije.component.css']
})
export class MojeRezervacijeComponent {
  //displayedColumns: string[] = ['hotel', 'datumRezervisanja','checkIn','checkOut', 'brojGostiju','brojDjece','cijena','actions'];
  dataSource = [];
  dataLoaded:boolean = false;
  gostRezervacije:any;
  displayedColumns:string[]=[];

  constructor(private httpklijent: HttpClient,public dialog: MatDialog) {
  }
  ngOnInit()
  {
    let vlasnikId=JSON.parse(localStorage.getItem("Working-user")||"").id;
    let uloga=JSON.parse(localStorage.getItem("Working-user")||"").korisnik.uloga;

    if(uloga=="Vlasnik"){
      this.displayedColumns= ['hotel', 'datumRezervisanja','checkIn','checkOut', 'brojGostiju','brojDjece','cijena'];
      this.httpklijent.get(MojConfig.adresa_servera+'/api/Korisnik/GetRezervacijeByVlasnikId?vlasnikId='+vlasnikId).subscribe((x:any)=>{
        this.dataLoaded=true;
        this.dataSource=x;
      })
    }
    else{
      this.displayedColumns = ['hotel', 'datumRezervisanja','checkIn','checkOut', 'brojGostiju','brojDjece','cijena','actions'];
      this.httpklijent.get(MojConfig.adresa_servera+'/api/Korisnik/GetRezervacijeByGostId?gostId='+vlasnikId).subscribe((x:any)=>{
        this.dataLoaded=true;
        this.dataSource=x;
        this.gostRezervacije=x;
      })
    }
  }

  openDialog(brojRezervacije: number) {
    const dialogRef = this.dialog.open(PrikaziBrojRezervacijeComponent, {
      width: '40rem',
      data: { brojRezervacije: brojRezervacije }
    });
  }  
}
