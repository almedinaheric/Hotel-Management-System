import { Component,Input } from '@angular/core';
import {FormControl, Validators,FormGroup} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MojConfig } from 'src/app/MojConfig';
import { Korisnik, Vlasnik } from 'src/app/Helpers/korisnik';
import { AutentifikacijaHelper } from 'src/app/Helpers/autentifikacija';

@Component({
  selector: 'app-moj-profil',
  templateUrl: './moj-profil.component.html',
  styleUrls: ['./moj-profil.component.css']
})
export class MojProfilComponent {
  workingUser:any;
  urediSpremi:boolean=true;
  korisnikId:any;
  formGroup:any;
  
  regexBrojTelefona="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$";

  constructor(private httpklijent:HttpClient, private router:Router) {
  }

  disejbluj(){
    if (this.urediSpremi == true) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  setujVrijednosti(){
    this.formGroup.patchValue({
      ime: this.workingUser.korisnik.ime,
      prezime: this.workingUser.korisnik.prezime,
      email: this.workingUser.korisnik.email,
      datumRodjenja: this.workingUser.korisnik.datum_rodjenja,
      brojTelefona: this.workingUser.korisnik.broj_telefona,
      brojRacuna: this.workingUser.brojBankovnogRacuna,
      brojLicneKarte: this.workingUser.brojLicneKarte,
      spol: this.workingUser.korisnik.spol
    });
  }

  //TODO: fix da se nakon updatea ucitaju updateovani podaci
  //TODO: datum se sprema kao dan prije

  SaveChanges(){
    if(this.urediSpremi){
      this.urediSpremi=!this.urediSpremi;
      this.disejbluj();
    }
    else if(this.urediSpremi==false){
      if(this.workingUser.korisnik.uloga=="Vlasnik"){
        let updateovaniPodaci={
          ime: this.formGroup.value.ime,
          prezime: this.formGroup.value.prezime,
          email: this.formGroup.value.email,
          datumRodjenja: this.formGroup.value.datumRodjenja,
          spol: this.formGroup.value.spol,
          brojTelefona: this.formGroup.value.brojTelefona,
          brojBankovnogRacuna: this.formGroup.value.brojRacuna,
          brojLicneKarte: this.formGroup.value.brojLicneKarte,        
        };
        this.httpklijent.post(MojConfig.adresa_servera+'/api/Korisnik/UpdatePodaciMojProfilVlasnik/'+this.korisnikId,updateovaniPodaci,MojConfig.http_opcije()).subscribe((x:any) => {
          //@ts-ignore
          porukaSuccess("Uspjesno ste uredili podatke! Novi podaci ce se prikazati prilikom sljedece prijave!");
        });
        this.urediSpremi=!this.urediSpremi;
        this.disejbluj();
      }
      else{
        this.urediSpremi=!this.urediSpremi;
        this.disejbluj();
      }
    }
  }

  ngOnInit(){
    //@ts-ignore
    this.workingUser=JSON.parse(localStorage.getItem("Working-user"));
    this.korisnikId=this.workingUser.korisnik.id;
    
    this.formGroup=new FormGroup({
      ime :new FormControl('', [Validators.required]),
      prezime : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required,Validators.email]),
      datumRodjenja : new FormControl(''),
      brojTelefona : new FormControl('', [Validators.required,Validators.pattern(this.regexBrojTelefona)]),
      spol : new FormControl('', [Validators.required]),
      brojRacuna : new FormControl('', [Validators.required,Validators.minLength(16),Validators.maxLength(16)]),
      brojLicneKarte : new FormControl('', [Validators.required])
    });

    this.setujVrijednosti();
    this.disejbluj();
  }
}
