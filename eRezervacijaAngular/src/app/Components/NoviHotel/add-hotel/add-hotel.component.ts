import { Component,Input, ViewChild } from '@angular/core';
import { HotelDetaljiComponent } from '../hotel-detalji/hotel-detalji.component';
import { OpsteInformacijeComponent } from '../opste-informacije/opste-informacije.component';
import { Router,ActivatedRoute } from '@angular/router';
import { PopisSobaComponent } from '../popis-soba/popis-soba.component';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../../MojConfig";
import { HotelDataService } from 'src/app/Helpers/hotel-data.service';
import { SobaDataService } from 'src/app/Helpers/soba-data.service';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent {
  contentDalje:string="Dalje";
  opsteInfoFormData: any;
  sobaServis:any;
  rooms:any[]=[];
  postojiSoba:boolean=false;

  @ViewChild (OpsteInformacijeComponent) opsteInfoComponent: OpsteInformacijeComponent;
  @ViewChild (HotelDetaljiComponent) detaljiHotelaComponent: HotelDetaljiComponent;
  @ViewChild (PopisSobaComponent) popisSobaComponent: PopisSobaComponent;

  title:string;
  hotel:any={};
  currentIndex:number=0;
  url:string;

  getHotel:any;
  getHotelID:any=0;
  getHotelDetalji:any;
  getHotelDetaljiID:any=0;

  vlasnik:any;
  vlasnikID:any;

  constructor(private route: ActivatedRoute,private router:Router,private httpklijent: HttpClient,
    private hotelDataService: HotelDataService,private sobaDataService:SobaDataService){ }

  ngOnInit(){
    this.SectionHeading();
    this.route.params.subscribe(params=>{
      this.currentIndex = +params["currentIndex"];
    });
    this.SectionHeading();

    //@ts-ignore
    this.vlasnik=JSON.parse(localStorage.getItem("Working-user"));
    this.vlasnikID=this.vlasnik.id;
  }

  onNext() {
    if(this.currentIndex==0){
      if(this.opsteInfoComponent.validiraj()){
        this.opsteInfoComponent.onNext();
        this.currentIndex++;
      }
      else{
        //@ts-ignore
        porukaError("Check your input");
      }
    }
    else if(this.currentIndex==1){
      if(this.detaljiHotelaComponent.validiraj()){
        this.detaljiHotelaComponent.onNext();
        this.currentIndex++;
        this.SpremiHotelUBazu(this.getHotelID,this.getHotelDetaljiID);
      }
      else{
        //@ts-ignore
        porukaError("Check your input");
      }
    }
    else if(this.currentIndex==2 && this.contentDalje=='Završi'){
      sessionStorage.clear();
      this.router.navigate(['/dashboard/mojiObjekti']);
    }
    this.SectionHeading();
  }

  onBack(){
    this.currentIndex--;
    this.SectionHeading();
  }

  SectionHeading(){
    if(this.currentIndex==0){
      this.title='Opšte informacije';
      this.contentDalje='Dalje';
    }
    else if(this.currentIndex==1){
      this.title='Detalji hotela';
      this.contentDalje='Dalje';
    }
    else if(this.currentIndex==2){
      this.title='Dodavanje soba';
      this.contentDalje='Završi';
    }
  }

  DaLiPostojiSoba(postoji:boolean){
    this.postojiSoba=postoji;
  }

  SpremiHotelUBazu(getHotelID:number,getHotelDetaljiID:number){
    //@ts-ignore
    const opsteInfoStorage=JSON.parse(sessionStorage.getItem("opsteInformacijeHotel"));
    //@ts-ignore
    const detaljiHotelaStorage=JSON.parse(sessionStorage.getItem("detaljiHotel"));
    //@ts-ignore
    const slikaStorage= sessionStorage.getItem("jednaSlika");
    //@ts-ignore
    const hotelAmenitiesStorage=JSON.parse(sessionStorage.getItem("hotelAmenities"));
    //@ts-ignore
    const vlasnik=JSON.parse(localStorage.getItem("Working-user"));
    const vlasnikId=vlasnik.id;

    const hotelPodaci={
      naziv: opsteInfoStorage.nazivHotela,
      opis: opsteInfoStorage.opis,
      adresa: opsteInfoStorage.adresa,
      vlasnikID:vlasnikId,
      hotelDetaljiID: null,
      emailHotela: opsteInfoStorage.email,
      brojTelefona: opsteInfoStorage.brojTelefona,
      slika: slikaStorage,
      gradID: opsteInfoStorage.grad,
      ukupanBrojSoba: parseInt(detaljiHotelaStorage.brojJednokrevetnihSoba) +
                      parseInt(detaljiHotelaStorage.brojDvokrevetnihSoba) +
                      parseInt(detaljiHotelaStorage.brojTrokrevetnihSoba),
      brojJednokrevetnihSoba: parseInt(detaljiHotelaStorage.brojJednokrevetnihSoba),
      brojDvokrevetnihSoba: parseInt(detaljiHotelaStorage.brojDvokrevetnihSoba),
      brojTrokrevetnihSoba: parseInt(detaljiHotelaStorage.brojTrokrevetnihSoba),
      brojSpratova: parseInt(detaljiHotelaStorage.brojSpratova),
      vrijemeCheckIna: detaljiHotelaStorage.vrijemeCheckIna,
      vrijemeCheckOuta: detaljiHotelaStorage.vrijemeCheckOuta,
      brojZvjezdica:detaljiHotelaStorage.brojZvjezdica,
      udaljenostOdCentraGrada:detaljiHotelaStorage.udaljenost
    }

    this.httpklijent.post(MojConfig.adresa_servera + '/api/Hotel/AddHotelDetalji/'+getHotelDetaljiID,hotelAmenitiesStorage,MojConfig.http_opcije()).subscribe(x => {
      this.getHotelDetalji=x;
      this.getHotelDetaljiID=this.getHotelDetalji.id;
      hotelPodaci.hotelDetaljiID = this.getHotelDetaljiID;

      this.httpklijent.post(MojConfig.adresa_servera + '/api/Hotel/AddHotel',hotelPodaci,MojConfig.http_opcije()).subscribe(x => {
        this.getHotel=x;
        this.getHotelID=this.getHotel.id;
        sessionStorage.setItem('idHotela',this.getHotelID);
      });
    }); 
  }
}