import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MojConfig } from 'src/app/MojConfig';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  regexPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]\\|;:'",.<>\/?]).{8,}$/;
  passwordi:any;
  token:any;

  constructor(private route: ActivatedRoute,private router:Router,private httpklijent: HttpClient){ }

  ngOnInit(){
    this.passwordi=new FormGroup({
      newPassword:new FormControl('', [Validators.required,Validators.pattern(this.regexPassword)]),
      confirmedPassword:new FormControl('', [Validators.required,Validators.pattern(this.regexPassword)])
    });

    this.route.queryParams.subscribe(params=>{
      this.token = params['token'];
    });
  }

  private validatePassword(): boolean {
    if (this.passwordi.controls.newPassword.hasError('pattern') ||
        this.passwordi.controls.confirmedPassword.hasError('pattern')) {
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

  UpdatePassword(){
    if(!this.validatePassword()){
      return;
    }
    if(!this.Validiraj()){
      return;
    }

    if(this.passwordi.value.newPassword===this.passwordi.value.confirmedPassword){
      const pass=this.passwordi.value.newPassword;
      this.httpklijent.post(MojConfig.adresa_servera+`/api/Korisnik/UpdateForgotPassword/update-password?token=${this.token}&password=${pass}`,MojConfig.http_opcije()).subscribe((x:any)=>{
        //@ts-ignore
        porukaSuccess("Uspjesno ste promijenili password, pokusajte se logirati");
        this.router.navigate(['']);
      },
      (err:HttpErrorResponse)=>{
        if (err.status === 404) {
          alert("Korisnik sa unesenim tokenom nije pronađen.");
        } else {
          alert("Došlo je do greške prilikom slanja zahtjeva za resetovanje lozinke.");
        }
      });
    }
    else{
      //@ts-ignore
      porukaError("Passwordi se ne podudaraju!");
    }
  }
}
