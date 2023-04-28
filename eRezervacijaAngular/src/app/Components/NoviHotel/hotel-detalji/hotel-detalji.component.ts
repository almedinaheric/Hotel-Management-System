import { Component,Output,EventEmitter } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-hotel-detalji',
  templateUrl: './hotel-detalji.component.html',
  styleUrls: ['./hotel-detalji.component.css']
})
export class HotelDetaljiComponent {
  @Output() formData = new EventEmitter<any>();

  constructor(private fb: FormBuilder){}

  detaljiInfoForm:any;

  ngOnInit(){
    this.detaljiInfoForm=new FormGroup({
      brojSpratova:new FormControl('',Validators.required),
      brojJednokrevetnihSoba:new FormControl('',Validators.required),
      brojDvokrevetnihSoba:new FormControl('',Validators.required),
      brojTrokrevetnihSoba:new FormControl('',Validators.required),
      vrijemeCheckIna:new FormControl('',Validators.required),
      vrijemeCheckOuta:new FormControl('',Validators.required),
      brojZvjezdica:new FormControl('',[Validators.required, Validators.min(1), Validators.max(5)]),
      udaljenost:new FormControl('',Validators.required) 
    });

    //@ts-ignore
    const savedValues = JSON.parse(sessionStorage.getItem('detaljiHotel'));
    if (savedValues) {
      this.detaljiInfoForm.patchValue(savedValues);
    }
  }

  validiraj(){
    if(this.detaljiInfoForm.invalid) {
      return false;
      
    }
    else{
      return true;
    }
  }

  onNext() {
    sessionStorage.setItem('detaljiHotel', JSON.stringify(this.detaljiInfoForm.value));
    this.formData.emit(this.detaljiInfoForm.value);
  }
}
