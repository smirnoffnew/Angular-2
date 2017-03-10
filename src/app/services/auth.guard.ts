import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private tokenService: TokenService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    //'sign-in sign-up' redirect for status: "Not authorized"
    if ( !this.tokenService.isAuthorized() && (state.url=='/sign-in' || state.url=='/sign-up') ) {
      return true;
    }

    //'sign-in sign-up' redirect for status: "Authorized"
    if ( this.tokenService.isAuthorized() && (state.url=='/sign-in' || state.url=='/sign-up') ) {
      this.router.navigate(['/feed']);
      return false;
    }

    //'sign-in sign-out' redirect for status: "Authorized"
    if ( this.tokenService.isAuthorized() && state.url=='/sign-out') {
      this.tokenService.delete();
      this.router.navigate(['/sign-in']);
      return true;
    }

    if ( this.tokenService.isAuthorized() ) {
      //redirect for all Authorized urls status: "Authorized"
      return true;
    } else {
      //redirect for all Authorized urls status: "Not authorized"
      this.router.navigate(['/sign-in']);
      return false;
    }

  }
}