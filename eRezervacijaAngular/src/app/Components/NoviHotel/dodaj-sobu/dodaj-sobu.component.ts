import { Component,Output,EventEmitter } from '@angular/core';
import { FormControl, Validators,FormGroup,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dodaj-sobu',
  templateUrl: './dodaj-sobu.component.html',
  styleUrls: ['./dodaj-sobu.component.css']
})
export class DodajSobuComponent {
  @Output() formData = new EventEmitter<any>();
  opsteInfoSoba:any;

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.opsteInfoSoba=new FormGroup({
      nazivSobe:new FormControl('',Validators.required),
      opisSobe:new FormControl('',Validators.required),
      brojIstihSoba:new FormControl('',Validators.required),
      kapacitet:new FormControl('',Validators.required),
      brojKrevetaZaJednuOsobu:new FormControl('',Validators.required),
      brojKrevetaNaSprat:new FormControl('',Validators.required),
      brojBracnihKreveta:new FormControl('',Validators.required),
      ukupnaCijena:new FormControl('',Validators.required),
      mogucnostDodavanjaDjecijegKreveta: new FormControl(false)
    });

    //@ts-ignore
    const savedValues = JSON.parse(sessionStorage.getItem('opsteInformacijeSoba'));
    if (savedValues) {
      this.opsteInfoSoba.patchValue(savedValues);
    }
  }

  validiraj(){
    if(this.opsteInfoSoba.invalid) {
      return false;
      
    }
    else{
      return true;
    }
  }

  onNext() {
    sessionStorage.setItem('opsteInformacijeSoba', JSON.stringify(this.opsteInfoSoba.value));
    this.formData.emit(this.opsteInfoSoba.value);
  }
}
