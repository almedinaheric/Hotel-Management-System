import { Component } from '@angular/core';
import { FormControl,Validators,FormGroup } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../MojConfig";
import {Router} from "@angular/router";
import {AutentifikacijaHelper} from "../../Helpers/autentifikacija";


@Component({
  selector: 'app-promijeni-lozinku',
  templateUrl: './promijeni-lozinku.component.html',
  styleUrls: ['./promijeni-lozinku.component.css']
})
export class PromijeniLozinkuComponent {
  workingUser:any;
  korisnikId:any;
  passwordi:any;
  regexPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]\\|;:'",.<>\/?]).{8,}$/;

  constructor(private httpklijent: HttpClient,private router:Router){}

  private validatePassword(): boolean {
    if (this.passwordi.controls.noviPassword.hasError('pattern') ||
        this.passwordi.controls.potvrdaPassword.hasError('pattern')) {
      //@ts-ignore
      porukaError('Password must contain at least 8 characters including uppercase, lowercase, digits and special characters.');
      return false;
    }
    return true;
  }

  Validiraj(): boolean {
    if (this.passwordi.valid) {
      return true;
    }
    //@ts-ignore
    porukaError('Check your input!');
    return false;
  }

  ChangePassword(){
    if(!this.Validiraj()){
      return;
    }
    if(!this.validatePassword()){
      return;
    }

    if(this.passwordi.value.noviPassword===this.passwordi.value.potvrdaPassword){
      const pass={
        oldPassword: this.passwordi.value.trenutniPassword,
        newPassword: this.passwordi.value.noviPassword
      }

      this.httpklijent.post(MojConfig.adresa_servera+'/api/Korisnik/ChangePassword/'+this.korisnikId,pass,MojConfig.http_opcije()).subscribe((x:any)=>{
        //@ts-ignore
        porukaSuccess("Uspjesno ste promijenili password, molimo logirajte se ponovo");
        
        let token=MojConfig.http_opcije();
        // @ts-ignore
        AutentifikacijaHelper.setLoginInfo(null);
        this.httpklijent.post(MojConfig.adresa_servera+'/api/Korisnik/Logout', null, token).subscribe(x=>{
          this.router.navigate(['/']);
        });
      },(error) => {
        //@ts-ignore
        porukaError(error.error); 
      });
    }
    else{
      //@ts-ignore
      porukaError("Passwordi se ne podudaraju!");
    }
  }
  
  ngOnInit(){
    //@ts-ignore
    this.workingUser=JSON.parse(localStorage.getItem("Working-user"));
    this.korisnikId=this.workingUser.korisnik.id;

    this.passwordi=new FormGroup({
      trenutniPassword:new FormControl('', [Validators.required]),
      noviPassword:new FormControl('', [Validators.required,Validators.pattern(this.regexPassword)]),
      potvrdaPassword:new FormControl('', [Validators.required,Validators.pattern(this.regexPassword)])
    });
  }
}
