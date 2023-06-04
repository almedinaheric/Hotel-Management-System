import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-pitanje-card',
  templateUrl: './pitanje-card.component.html',
  styleUrls: ['./pitanje-card.component.css']
})
export class PitanjeCardComponent {
  @Input() pitanje:any;
  @Input() odgovor:any;
  @Input() datumOdgovora:any;
}
