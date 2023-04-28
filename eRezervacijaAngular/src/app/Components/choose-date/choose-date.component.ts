import { Component,  Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-choose-date',
  templateUrl: './choose-date.component.html',
  styleUrls: ['./choose-date.component.css']
})
export class ChooseDateComponent {
  @Input() id: string = "";
  @Input() label: any;
  @Input() input: any;
  
  getErrorMessage() {
    return "Check your input!";
  }
}
