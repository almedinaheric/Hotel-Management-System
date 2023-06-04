import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AutentifikacijaHelper} from "../Helpers/autentifikacija";


@Injectable()
export class AutorizacijaLoginProvjera implements CanActivate
{
  constructor(private router: Router)
  {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      if (AutentifikacijaHelper.getLoginInfo().isLogiran)
      {
        let jeLiOtkljucano= AutentifikacijaHelper.getLoginInfo().autentifikacijaToken?.twoFJelOtkljucano;
        if(!jeLiOtkljucano)
        {
          this.router.navigate(['two-factor']);
          return false;
        }
        return true;
      }
    }
      catch (e) {
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate([''], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
