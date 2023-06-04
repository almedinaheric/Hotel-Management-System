import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { MojConfig } from 'src/app/MojConfig';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-preview-rezervacije-popup',
  templateUrl: './preview-rezervacije-popup.component.html',
  styleUrls: ['./preview-rezervacije-popup.component.css']
})
export class PreviewRezervacijePopupComponent {
  input='';
  warning=false;
  gostId:any;
  korisnik:any;
  hotel:any;
  hotelId:any;
  grad:any;
  brojDjece:any;
  brojOdraslih:any;
  datumCheckIn:any;
  datumCheckOut:any;
  brojSoba:any;
  brojGostiju:any;
  cijena:any;
  ukupnaCijena:any=0;
  datetimenow=new Date().toISOString().slice(0, 10);

  constructor(private httpklijent: HttpClient,private route: ActivatedRoute,private router:Router){}

  goBack() {
    if(confirm("Da li ste sigurni da zelite odustati?")==true){
      this.router.navigate([`/odabraniHotel/${this.hotelId}/fromCard`]);
    }
  }

  ngOnInit(){
    //@ts-ignore
    this.korisnik=JSON.parse(localStorage.getItem('Working-user'));
    
    this.brojDjece=sessionStorage.getItem('numDjece');
    this.brojOdraslih=sessionStorage.getItem('numGuests');
    this.brojSoba=sessionStorage.getItem('numRooms');
    this.datumCheckIn=JSON.parse(sessionStorage.getItem('dateRange')||"").dateStart;
    this.datumCheckOut=JSON.parse(sessionStorage.getItem('dateRange')||"").dateEnd;
    this.brojGostiju=parseInt(this.brojDjece)+parseInt(this.brojOdraslih);
    //@ts-ignore
    this.cijena=JSON.parse(sessionStorage.getItem('roomInfo'));

    const dateEnd = new Date(this.datumCheckOut);
    const dateStart = new Date(this.datumCheckIn);

    const timeDiff = dateEnd.getTime() - dateStart.getTime();
    const numNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    for(let i in this.cijena){
      if(this.cijena[i].brojSoba>0){
        this.ukupnaCijena= this.ukupnaCijena+ (this.cijena[i].ukupnaCijena*numNights);
        sessionStorage.setItem('ukupnaCijena', this.ukupnaCijena);
      }
    }

    this.hotelId=sessionStorage.getItem('hotelId');
    this.httpklijent.get(MojConfig.adresa_servera+'/api/Hotel/GetHotelByHotelId/'+this.hotelId).subscribe((x:any)=>{
      this.hotel=x;
      this.httpklijent.get(MojConfig.adresa_servera+'/api/Grad/GetGradaById/'+this.hotel.gradID).subscribe((x:any)=>{
        this.grad=x.name;
      });
    });
  }

}
