import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-recenzija-card',
  templateUrl: './recenzija-card.component.html',
  styleUrls: ['./recenzija-card.component.css']
})
export class RecenzijaCardComponent {
  @Input() osoba:any;
  @Input() ocjena:any;
  @Input() komentar:any;
}
