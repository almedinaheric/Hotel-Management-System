import { Component } from '@angular/core';
import {Router, RouterModule, RouterLinkActive, NavigationEnd} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../MojConfig";
import { Grad } from 'src/app/Helpers/grad';
import { FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-uredi-hotel',
  templateUrl: './uredi-hotel.component.html',
  styleUrls: ['./uredi-hotel.component.css']
})
export class UrediHotelComponent {
  hotel:any;
  gradovi:Grad[]=[];
  formData:any;
  slika:any;
  vlasnikId:any;
  brojSoba:any;
  tajgrad:any;
  regexBrojTelefona="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$";

  constructor(private httpklijent:HttpClient, private router: Router) {
  }

  ObrisiSessionStorage(){
    sessionStorage.clear();
  }

  ngOnInit(){
    //@ts-ignore
    this.hotel=JSON.parse(sessionStorage.getItem('hotel'));
    this.vlasnikId=JSON.parse(localStorage.getItem("Working-user")||"").id;
    
    this.formData=new FormGroup({
      naziv:new FormControl('',Validators.required),
      grad:new FormControl('',Validators.required),
      adresa:new FormControl('',Validators.required),
      emailHotela:new FormControl('',[Validators.required,Validators.email]),
      brojTelefona:new FormControl('',[Validators.required,Validators.pattern(this.regexBrojTelefona)]),
      opis:new FormControl('',Validators.required),
      brojSpratova:new FormControl('',Validators.required),
      brojJednokrevetnihSoba:new FormControl('',Validators.required),
      brojDvokrevetnihSoba:new FormControl('',Validators.required),
      brojTrokrevetnihSoba:new FormControl('',Validators.required),
      vrijemeCheckIna:new FormControl('',Validators.required),
      vrijemeCheckOuta:new FormControl('',Validators.required),
      brojZvjezdica:new FormControl('',[Validators.required, Validators.min(1), Validators.max(5)]),
      udaljenostOdCentraGrada:new FormControl('',Validators.required) 
    });
    
    this.brojSoba=this.formData.brojJednokrevetnihSoba+this.formData.brojDvokrevetnihSoba+this.formData.brojTrokrevetnihSoba;
    sessionStorage.setItem('jednaSlika',this.hotel.slika);
    this.getGrad();

    //@ts-ignore
    const savedValues = JSON.parse(sessionStorage.getItem('hotel'));
    if (savedValues) {
      this.formData.patchValue(savedValues);
    }
  }

  Validiraj(){
    if(this.formData.valid) {
      return true;
    }
    else{
      return false;
    }
  }

  SaveChanges(){
    //@ts-ignore
    const slika= sessionStorage.getItem("jednaSlika");

    if(this.Validiraj()){
      const hotelPodaci={
        naziv: this.formData.controls.naziv.value,
        opis: this.formData.controls.opis.value,
        adresa: this.formData.controls.adresa.value,
        vlasnikID:this.vlasnikId,
        emailHotela: this.formData.controls.emailHotela.value,
        brojTelefona: this.formData.controls.brojTelefona.value,
        slika: slika,
        gradID: this.formData.controls.grad.value,
        ukupanBrojSoba: parseInt(this.formData.controls.brojJednokrevetnihSoba.value) +
                        parseInt(this.formData.controls.brojDvokrevetnihSoba.value) +
                        parseInt(this.formData.controls.brojTrokrevetnihSoba.value),
        brojJednokrevetnihSoba: this.formData.controls.brojJednokrevetnihSoba.value,
        brojDvokrevetnihSoba: this.formData.controls.brojDvokrevetnihSoba.value,
        brojTrokrevetnihSoba: this.formData.controls.brojTrokrevetnihSoba.value,
        brojSpratova: this.formData.controls.brojSpratova.value,
        vrijemeCheckIna: this.formData.controls.vrijemeCheckIna.value,
        vrijemeCheckOuta: this.formData.controls.vrijemeCheckOuta.value,
        brojZvjezdica:this.formData.controls.brojZvjezdica.value,
        udaljenostOdCentraGrada:this.formData.controls.udaljenostOdCentraGrada.value
      }
  
      if(confirm('Jeste li sigurni da zelite sacuvati promjene?')==true){
        this.httpklijent.post(MojConfig.adresa_servera + '/api/Hotel/UpdatePodaciHotel/'+this.hotel.id,hotelPodaci,MojConfig.http_opcije()).subscribe(x => {
         sessionStorage.clear();
          this.router.navigate(['dashboard','mojiObjekti']);
      });
    }
    }
    else{
      //@ts-ignore
      porukaError("Check your input!");
    }
  }

  Odbaci(){
    if(confirm('Jeste li sigurni da zelite odbaciti promjene?')==true){
      sessionStorage.clear();
      this.router.navigate(['dashboard','mojiObjekti']);
    }
  }

  getGrad(){
    this.httpklijent.get<Grad[]>(MojConfig.adresa_servera+ '/api/Grad/GetAll',MojConfig.http_opcije()).subscribe(x=>{
      this.gradovi=x.sort((a,b)=>{
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0; 
    });
    for (let grad of this.gradovi) {
      if(grad.id==this.hotel.gradID){
        this.tajgrad=grad;
      }
    }
    this.formData.controls.grad.setValue(this.tajgrad.id);
  })
}
}
