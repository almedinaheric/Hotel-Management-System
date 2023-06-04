import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AutentifikacijaHelper} from "../../Helpers/autentifikacija";
import {LoginInformacije} from "../../Helpers/loginInformacije";

@Component({
  selector: 'app-user-not-active',
  templateUrl: './user-not-active.component.html',
  styleUrls: ['./user-not-active.component.css']
})
export class UserNotActiveComponent {
  constructor(private router: Router) { }

  ngOnInit(): void {
    let isAktiviran = AutentifikacijaHelper.getLoginInfo().autentifikacijaToken?.korisnik?.isAktiviran;

    if (isAktiviran)
    {
      this.router.navigate(['/']);
    }
  }

  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }
}
