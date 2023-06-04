import { Component,Input } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MojConfig } from 'src/app/MojConfig';

@Component({
  selector: 'app-forgot-pass-email',
  templateUrl: './forgot-pass-email.component.html',
  styleUrls: ['./forgot-pass-email.component.css']
})
export class ForgotPassEmailComponent {
  public ResetPasswordEmail:string;
  public isValidEmail:boolean;
  uloga:any;

  constructor(private route: ActivatedRoute,private router:Router,private httpklijent: HttpClient,){}

  email = new FormControl('', [Validators.required,Validators.email]);

  ngOnInit(){
    this.route.params.subscribe(params=>{
      this.uloga = params["uloga"];
    });
  }

  BackToLogin(){
    if(this.uloga=="Guest"){
      this.router.navigate(['loginGost']);
    }
    else if(this.uloga=="Owner"){
      this.router.navigate(['loginVlasnik']);
    }
    else{
      this.router.navigate(['loginAdmin']);
    }
  }

  Potvrdi(){
    let mail=this.email.value?.toString();
    if(this.email.valid){
      this.httpklijent.post(MojConfig.adresa_servera+'/api/Korisnik/ForgotPassword?email='+mail,MojConfig.http_opcije()).subscribe((x:any)=>{
        alert("Link za reset passworda vam je poslan na email!")
        this.email.reset();
        this.BackToLogin();
      },(err:HttpErrorResponse)=>{
        if (err.status === 404) {
          alert("Korisnik sa unesenom email adresom nije pronađen.");
        } else {
          alert("Došlo je do greške prilikom slanja zahtjeva za resetovanje lozinke.");
        }
      });
    }
    else{
      //@ts-ignore
      porukaError("Your email is not valid! Try again!");

    }

  }
}
