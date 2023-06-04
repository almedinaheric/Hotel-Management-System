import { Component } from '@angular/core';
import {MojConfig} from "../../MojConfig";
import { HttpClient } from '@angular/common/http';
import { FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Kombinacija } from 'src/app/Helpers/kombinacija';

@Component({
  selector: 'app-uplata-rezervacije',
  templateUrl: './uplata-rezervacije.component.html',
  styleUrls: ['./uplata-rezervacije.component.css']
})
export class UplataRezervacijeComponent {
  nacinPlacanja:any[]=[];
  opcija:any;
  disejblujPlacanje:boolean=false;
  gotovina:boolean=false;
  kartica:boolean=false;
  userCard:any;
  promijeni:boolean=false;
  tekst:string="Zamijeni karticu";
  korisnik:any;
  brojDjece:any;
  brojOdraslih:any;
  datumCheckIn:any;
  datumCheckOut:any;
  brojSoba:any;
  brojGostiju:any;
  cijena:any;
  sobeRange:any;
  kombinacije:Kombinacija[]=[];
  hotelId:any;
  vlasnikId:any;
  brojRacuna:any;

  regexBrojKartice="([0-9]){4}[ -]?([0-9]){4}[ -]?([0-9]){4}[ -]?([0-9]){4}";
  regexDatumIsteka="([0-1][0-9])\\/(2[0-9])";
  regexCVV="([0-9]){3}";

  constructor(private httpklijent:HttpClient, private router: Router,) {
  }

  buttonContent(){
    this.promijeni=!this.promijeni;
    if(this.promijeni){
      this.tekst="Odustani";
    }
    else{
      this.tekst="Zamijeni karticu";
    }
  }

  ngOnInit(){
    this.httpklijent.get(MojConfig.adresa_servera+'/api/Korisnik/GetAllNacinPlacanja').subscribe((x:any)=>{
      this.nacinPlacanja=x;
    })

    //@ts-ignore
    this.korisnik=JSON.parse(localStorage.getItem('Working-user'));
    this.brojDjece=sessionStorage.getItem('numDjece');
    this.brojOdraslih=sessionStorage.getItem('numGuests');
    this.brojSoba=sessionStorage.getItem('numRooms');
    this.datumCheckIn=JSON.parse(sessionStorage.getItem('dateRange')||"").dateStart;
    this.datumCheckOut=JSON.parse(sessionStorage.getItem('dateRange')||"").dateEnd;
    this.brojGostiju=parseInt(this.brojDjece)+parseInt(this.brojOdraslih);
    this.cijena=sessionStorage.getItem('ukupnaCijena');
    this.hotelId=sessionStorage.getItem('hotelId');
    //@ts-ignore
    this.sobeRange=JSON.parse(sessionStorage.getItem('roomInfo'));

    for (let i in this.sobeRange){
      if(this.sobeRange[i].brojSoba>0){
        const novaKombinacija: Kombinacija = {
          naziv: this.sobeRange[i].naziv,
          broj: this.sobeRange[i].brojSoba
        };
        this.kombinacije.push(novaKombinacija);
      }
    }

    this.httpklijent.get(MojConfig.adresa_servera+'/api/Hotel/GetHotelByHotelId/'+this.hotelId, MojConfig.http_opcije()).subscribe((x:any)=>{
      this.vlasnikId=x.vlasnikID;
      this.httpklijent.get(MojConfig.adresa_servera+'/api/Korisnik/GetVlasnikByVlasnikId/'+this.vlasnikId, MojConfig.http_opcije()).subscribe((x:any)=>{
        this.brojRacuna=x.brojBankovnogRacuna;
      });
    });
    
    this.getajKarticu();
  }

  getajKarticu(){
    let user=localStorage.getItem('Working-user')||"";
    let gostid=JSON.parse(user).korisnikID;
    this.httpklijent.get(MojConfig.adresa_servera+'/api/Korisnik/GetKreditnaKarticaByKorisnikID?korisnikId='+gostid).subscribe((x:any)=>{
      this.userCard=x;
      if(this.kartica!=null)
        {
          this.brojKartice.setValue(this.userCard.brojKartice);
          this.datumIsteka.setValue(this.userCard.datumIsteka);
          this.CVV.setValue(this.userCard.cvv);
        }
    });
  }

  brojKartice = new FormControl('', [Validators.required, Validators.pattern(this.regexBrojKartice)]);
  datumIsteka = new FormControl('', [Validators.required, Validators.pattern(this.regexDatumIsteka)]);
  CVV = new FormControl('', [Validators.required, Validators.pattern(this.regexCVV)]);
  
  gotovinom(){
    this.disejblujPlacanje=true;
    this.gotovina=true;
    this.kartica=false;
    this.promijeni=false;
    this.tekst="Zamijeni karticu";
  }
  
  karticom(){
    this.disejblujPlacanje=true;
    this.kartica=true;
    this.gotovina=false;
  }

  dodajTransakciju(){
    let transakcija;
    let rezervacija;
    let got:boolean;
    if(this.gotovina){
      got =true;
      rezervacija={
        gostId:this.korisnik.id,
        datumCheckIn:this.datumCheckIn,
        datumCheckOut:this.datumCheckOut,
        brojGostiju:this.brojGostiju,
        brojOdraslih:parseInt(this.brojOdraslih),
        brojDjece:parseInt(this.brojDjece),
        nacinPlacanjaId:2,
        cijena:parseFloat(this.cijena),
        kombinacije:this.kombinacije
      }
    }
    else{
      got=false;
      rezervacija={
        gostId:this.korisnik.id,
        datumCheckIn:this.datumCheckIn,
        datumCheckOut:this.datumCheckOut,
        brojGostiju:this.brojGostiju,
        brojOdraslih:parseInt(this.brojOdraslih),
        brojDjece:parseInt(this.brojDjece),
        nacinPlacanjaId:1,
        cijena:parseFloat(this.cijena),
        kombinacije:this.kombinacije
      }
    }
    
    if(confirm('Jeste li sigurni da zelite potvrditi i platiti rezervaciju?')==true){
      this.httpklijent.post(MojConfig.adresa_servera+'/api/Korisnik/RezervisiSmjestaj/',rezervacija,MojConfig.http_opcije()).subscribe((x:any)=>{
        if(got==true){
          transakcija={
            rezervacijaId:x.id,
            hotelId:this.hotelId,
            brojRacuna:this.brojRacuna,
            cijena:this.cijena
          }
        }
        else{
          transakcija={
            rezervacijaId:x.id,
            hotelId:this.hotelId,
            brojRacuna:this.brojRacuna,
            kreditnaKarticaId:this.userCard.id,
            cijena:this.cijena
          }
        }

        this.httpklijent.post(MojConfig.adresa_servera+'/api/Korisnik/DodajTransakciju',transakcija,MojConfig.http_opcije()).subscribe((x:any)=>{
          //@ts-ignore
          porukaSuccess("Uspjesno ste rezervisali smjestaj! Na profilu u odjeljku 'Moje Rezervacije' mozete pronaci broj rezervacije, kao i detalje iste, hvala! ");
          sessionStorage.clear();
          this.router.navigate(['/landingPage']);
        });
      });
  }}
}
