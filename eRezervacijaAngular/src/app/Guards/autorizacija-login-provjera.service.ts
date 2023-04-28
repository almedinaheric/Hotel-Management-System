import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AutentifikacijaHelper} from "../Helpers/autentifikacija";


@Injectable()
export class AutorizacijaLoginProvjera implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    try {
      //nedovrseno privremeno rjesenje
      if (AutentifikacijaHelper.getLoginInfo().isLogiran) {

        //kod koji handlea logiku aktivacije, TODO kasnije implementirati logiku "aktiviranog" profila i ukljuciti u guards i providers na app.module.ts
        //let isAktiviran = AutentifikacijaHelper.getLoginInfo().autentifikacijaToken?.korisnik?.isAktiviran;
        //if (!isAktiviran)
        //{
        // this.router.navigate(['/user-not-active']);
        //  return false;
        //}

        return true;
      }
    }catch (e) {
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
