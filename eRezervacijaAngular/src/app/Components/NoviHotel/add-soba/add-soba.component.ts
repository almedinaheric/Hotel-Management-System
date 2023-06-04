import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink,ActivatedRoute } from '@angular/router';
import { DodajSobuComponent } from '../dodaj-sobu/dodaj-sobu.component';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../../MojConfig";
import { HotelDataService } from 'src/app/Helpers/hotel-data.service';
import { SobaDataService } from 'src/app/Helpers/soba-data.service';
import { Soba } from 'src/app/Helpers/soba';

@Component({
  selector: 'app-add-soba',
  templateUrl: './add-soba.component.html',
  styleUrls: ['./add-soba.component.css']
})
export class AddSobaComponent {
  contentDalje:string="Dalje";
  opsteInfoFormData: any;
  sobaServis:any;

  @ViewChild (DodajSobuComponent) dodajSobuComponent:DodajSobuComponent;

  title:string;
  hotel:any={};
  currentIndex:number=0;
  hotelId:any;
  imageUrlsString:any;

  sobaIds:any;
  
  constructor(private router: Router,private route: ActivatedRoute,private httpklijent: HttpClient,
    private hotelDataService: HotelDataService,private sobaDataService:SobaDataService) { }

  ngOnInit(){
    this.SectionHeading();
    this.hotelId=sessionStorage.getItem("idHotela");
    
  }

  SectionHeading(){
    if(this.currentIndex==0){
      this.title='Opšte informacije o sobi';
      this.contentDalje='Dalje';
    }
    else if(this.currentIndex==1){
      this.title='Detalji sobe';
      this.contentDalje='Dalje';
    }
    else if(this.currentIndex==2){
      this.title='Dodavanje slika';
      this.contentDalje='Završi';
    }
  }

  onNext() {
    if(this.currentIndex==0){
      if(this.dodajSobuComponent.validiraj()){
        this.dodajSobuComponent.onNext();
        this.currentIndex++;
      }
      else{
        //@ts-ignore
        porukaError("Check your input");
      }
    }
    else if(this.currentIndex==1){
      this.currentIndex++;
      this.spremiSobuUBazu();
    }
    else if(this.currentIndex==2){
      this.spremiSlikeUBazu();
      sessionStorage.removeItem('roomAmenities');
      sessionStorage.removeItem('opsteInformacijeSoba');
      sessionStorage.removeItem('imageUrls');
      this.router.navigate(["dodajHotel/addHotel",2]);
    }
    this.SectionHeading();
  }


  onBack(){
    if(this.currentIndex==0){
      this.router.navigate(["dodajHotel/addHotel",2]);
    }
    else{
      this.currentIndex--;
    }
    this.SectionHeading();
  }

  spremiSobuUBazu(){
    //@ts-ignore
    const roomAmenitiesStorage=JSON.parse(sessionStorage.getItem("roomAmenities"));
    //@ts-ignore
    const opsteInformacijeSoba=JSON.parse(sessionStorage.getItem("opsteInformacijeSoba"));

    const sobaPodaci={
      naziv:opsteInformacijeSoba.nazivSobe,
      opis:opsteInformacijeSoba.opisSobe,
      hotelID:this.hotelId,
      sobaDetaljiID:null,
      kapacitet:parseInt(opsteInformacijeSoba.kapacitet),
      brojKreveta:parseInt(opsteInformacijeSoba.brojKrevetaZaJednuOsobu)+
                  parseInt(opsteInformacijeSoba.brojKrevetaNaSprat)+
                  parseInt(opsteInformacijeSoba.brojBracnihKreveta),
      brojKrevetaZaJednuOsobu:parseInt(opsteInformacijeSoba.brojKrevetaZaJednuOsobu),
      brojKrevetaNaSprat:parseInt(opsteInformacijeSoba.brojKrevetaNaSprat),
      brojBracnihKreveta:parseInt(opsteInformacijeSoba.brojBracnihKreveta),
      mogucnostDodavanjaDjecijegKreveta:opsteInformacijeSoba.mogucnostDodavanjaDjecijegKreveta,
      ukupnaCijena:parseInt(opsteInformacijeSoba.ukupnaCijena)
    }

    let brojSobaIstogTipa=parseInt(opsteInformacijeSoba.brojIstihSoba);
    let getSobaDetalji:any;
    let getSoba:any;
    let getSobaId:any;

    this.httpklijent.post(MojConfig.adresa_servera+'/api/Soba/AddSobaDetalji',roomAmenitiesStorage,MojConfig.http_opcije()).subscribe((x:any) =>{
        this.sobaDataService.clearSobaData();
        getSobaDetalji=x;
        sobaPodaci.sobaDetaljiID=getSobaDetalji.id;
        for (let i = 0; i < brojSobaIstogTipa; i++){
          this.httpklijent.post(MojConfig.adresa_servera+'/api/Soba/AddSoba',sobaPodaci,MojConfig.http_opcije()).subscribe((x:any) =>{
            getSoba=x;
            getSobaId=getSoba.id;
            //OVDJE MI SE SPREMAJU SOBE ID U NIZ I ONDA KAD DODAJEM SLIKE DODAM U SVAKI OVAJ ID
            this.sobaDataService.setSobaData(getSoba);
            this.sobaIds=this.sobaDataService.getSobaIds();
          });
        }
      });

  }

  spremiSlikeUBazu(){
      for(let i=0;i<this.sobaIds.length;i++){
        let sobaId=this.sobaIds[i];
        //@ts-ignore
        this.imageUrlsString=sessionStorage.getItem("imageUrls");
        if(this.imageUrlsString.length > 0 && this.imageUrlsString){
          const imageUrls=JSON.parse(this.imageUrlsString);
          for (let j = 0; j < imageUrls.length; j++){
            let slika = {
              sobaId: sobaId,
              hotelId:this.hotelId,
              slika:imageUrls[j]
            };
            this.httpklijent.post(MojConfig.adresa_servera+"/api/Slika/AddSlika",slika,MojConfig.http_opcije()).subscribe((x:any) => {
              
            });
          }
        }
        else{
          console.log("nesto je do imgurls");
        }
      }
  }
}
