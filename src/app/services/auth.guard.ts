import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, 
              private tokenService: TokenService,
              private authService:AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.authService.isLoggedIn()
    .map( (isLoggedIn)=>{ 

        //'sign-in sign-up' redirect for status: "Not authorized"
        if ( !isLoggedIn && (state.url=='/sign-in' || state.url=='/sign-up') ) {
          return true;
        }

        //'sign-in sign-up' redirect for status: "Authorized"
        if ( isLoggedIn && (state.url=='/sign-in' || state.url=='/sign-up') ) {
          this.router.navigate(['/feed']);
          return false;
        }

        if ( isLoggedIn ) {
          //redirect for all Authorized urls status: "Authorized"
          return true;
        } else {
          //redirect for all Authorized urls status: "Not authorized"
          this.router.navigate(['/sign-in']);
          return false;
        }

    });
  }
}