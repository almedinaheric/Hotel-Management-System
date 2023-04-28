import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-login-opening-page',
  templateUrl: './login-opening-page.component.html',
  styleUrls: ['./login-opening-page.component.css']
})
export class LoginOpeningPageComponent {
  @Input() OwnerOrGuest: string="OwnerOrGuest";
}
