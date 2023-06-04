import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../MojConfig";
import { Hotel } from 'src/app/Helpers/hotel';
import { HotelDetalji } from 'src/app/Helpers/hotel';
import { ViewChild,ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { forkJoin } from 'rxjs';
import { map,switchMap } from 'rxjs/operators';
import { PostaviPitanjeComponent } from '../postavi-pitanje/postavi-pitanje.component';
import { KodZaRecenzijuComponent } from '../kod-za-recenziju/kod-za-recenziju.component';
import {PreviewRezervacijePopupComponent} from "../preview-rezervacije-popup/preview-rezervacije-popup.component";

@Component({
  selector: 'app-odabrani-hotel',
  templateUrl: './odabrani-hotel.component.html',
  styleUrls: ['./odabrani-hotel.component.css']
})
export class OdabraniHotelComponent {
  hotelId:any;
  hotel:any;
  detaljiId:any;
  hotelDetalji:any;
  recenzije:any;
  grad:any;
  drzava:any;
  gradId:any;
  drzavaId:any;
  detalji:any[]=[];
  expanded:boolean=false;
  brojRecenzija:any;
  slike:any[]=[];
  dataLoaded:boolean = false;
  brojPitanja:any;
  pitanja:any;
  from:any;

  rezervisiNiz:any;
  receiveData(data:any){
    this.rezervisiNiz=data;
  }

  constructor(private route: ActivatedRoute,private router:Router,private httpklijent: HttpClient,
    public dialog: MatDialog){}

  ngOnInit(): void{
    this.route.params.subscribe(params=>{
      this.hotelId = +params['id'];
      this.from=params['from'];
    });
    this.fetchHotelPodaci();
  }

  NaSearchResults(){
    this.router.navigate(['searchResults']);
  }

  NaLanding(){
    this.router.navigate(['landingPage'])
  }

  getSlika(s:any){
    return "data:image/png;base64," + s?.slika;
  }

  loadImage(s:any){
    return "data:image/png;base64,"+s;
  }

  fetchHotelPodaci(){
    this.httpklijent.get<Hotel>(MojConfig.adresa_servera+'/api/Hotel/GetHotelByHotelId/'+this.hotelId, MojConfig.http_opcije()).subscribe((x:any)=>{
      this.hotel=x;
      this.detaljiId=this.hotel.hotelDetaljiID;
      this.gradId=this.hotel.gradID;

      this.httpklijent.get<HotelDetalji>(MojConfig.adresa_servera+'/api/Hotel/GetHotelDetaljiByDetaljiId/'+this.detaljiId, MojConfig.http_opcije()).subscribe((x:any)=>{
        this.hotelDetalji=x;
        for(let d in this.hotelDetalji){
          if(this.hotelDetalji[d]==true){
            this.detalji.push(d);
          }
        }
      });

      this.httpklijent.get(MojConfig.adresa_servera+'/api/Korisnik/GetRecenzijeByHotelId?hotelId='+this.hotelId, MojConfig.http_opcije()).subscribe((x:any)=>{
        this.recenzije=x;
        this.brojRecenzija=this.recenzije.length;
      });

      this.httpklijent.get(MojConfig.adresa_servera+'/api/Grad/GetGradaById/'+this.gradId,MojConfig.http_opcije()).subscribe((x:any) => {
        this.grad=x;
        this.drzavaId=this.grad.drzavaID;

          this.httpklijent.get(MojConfig.adresa_servera+'/api/Drzava/GetDrzavaById/'+this.drzavaId,MojConfig.http_opcije()).subscribe((x:any) => {
            this.drzava=x;
          });
      });

      this.httpklijent.get(MojConfig.adresa_servera+'/api/Slika/GetByHotelId/'+this.hotelId,MojConfig.http_opcije()).subscribe((x:any)=>{
        this.slike=x;
        this.dataLoaded=true;
      });

      this.httpklijent.get(MojConfig.adresa_servera+'/api/Hotel/GetOdgovorenaPitanja/'+this.hotelId,MojConfig.http_opcije()).subscribe((x:any)=>{
        this.pitanja=x;
        this.brojPitanja=this.pitanja.length;
      });
    });

  }

  @ViewChild('recenzijeclass') recenzijediv: ElementRef;
  @ViewChild('pitanjaclass') pitanjadiv: ElementRef;

  scrollLeftDisabled = true;
  scrollRightDisabled = false;
  scrollLeftDisabledPitanja = true;
  scrollRightDisabledPitanja = false;

  scroll(direction: number) {
    this.recenzijediv.nativeElement.scrollBy({ left: direction * 300, behavior: 'smooth' });
    this.updateScrollButtons();
  }

  updateScrollButtons() {
    const cardsEl = this.recenzijediv.nativeElement;
    this.scrollLeftDisabled = cardsEl.scrollLeft === 0;
    this.scrollRightDisabled = cardsEl.scrollLeft + cardsEl.clientWidth >= cardsEl.scrollWidth;
  }

  scrollPitanja(direction: number) {
    this.pitanjadiv.nativeElement.scrollBy({ left: direction * 300, behavior: 'smooth' });
    this.updateScrollButtonsPitanja();
  }

  updateScrollButtonsPitanja() {
    const cardsEl = this.pitanjadiv.nativeElement;
    this.scrollLeftDisabledPitanja = cardsEl.scrollLeft === 0;
    this.scrollRightDisabledPitanja = cardsEl.scrollLeft + cardsEl.clientWidth >= cardsEl.scrollWidth;
  }

  prosireno(){
    this.expanded=!this.expanded;
  }

  postaviPitanje(){
    sessionStorage.setItem('hotelId',this.hotelId);
    const dialogRef = this.dialog.open(PostaviPitanjeComponent, {
      width: '40rem'
    });
  }

  dodajRecenziju(){
    sessionStorage.setItem('hotelId',this.hotelId);
    const dialogRef = this.dialog.open(KodZaRecenzijuComponent, {
      width: '40rem'
    });
  }

  rezervisi(){
    let prazno=true;
    for (const sobe of this.rezervisiNiz) {
      if(sobe.brojSoba>0)
        prazno=false;
    }
    if(prazno) return;
    sessionStorage.setItem("roomInfo", JSON.stringify(this.rezervisiNiz));
    sessionStorage.setItem("hotelId", this.hotelId);
    this.router.navigate(["rezervacija/0"]);
  }
}
