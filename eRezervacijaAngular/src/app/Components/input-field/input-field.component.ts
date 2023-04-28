import {Component, Input} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent {
  @Input() id: string = "";
  @Input() label: any;
  @Input() input: any;
  @Input() number: any;
  @Input() type: any;
  @Input() hint: any;
  
  constructor() {
  }

  getErrorMessage() {
    return "Check your input!";
  }
}
