import { Component,Input } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface inputArray {
  id: number;
  name: string;
}

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.css']
})

export class SelectBoxComponent {
  @Input() label: string;
  @Input() passedArray: inputArray[];
  @Input() formControlInput: FormControl;
  @Input() NameOrId: any;
}
