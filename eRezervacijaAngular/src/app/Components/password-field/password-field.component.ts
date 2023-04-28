import {Component, Input} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {coerceStringArray} from "@angular/cdk/coercion";

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.css']
})
export class PasswordFieldComponent {
  @Input() id: string="";
  @Input() label: any;
  @Input() password:any;
  hide:boolean=true;

  constructor() {
  }

  getErrorMessage() {
    return "Check your input!";
  }
}
