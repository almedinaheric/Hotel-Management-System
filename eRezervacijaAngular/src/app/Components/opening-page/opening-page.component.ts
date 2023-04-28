import { Component } from '@angular/core';
import { LoginOpeningPageComponent } from '../login-opening-page/login-opening-page.component';

@Component({
  selector: 'app-opening-page',
  templateUrl: './opening-page.component.html',
  styleUrls: ['./opening-page.component.css']
})
export class OpeningPageComponent {
  Owner:string = 'Owner';
  Guest:string = 'Guest';
}
