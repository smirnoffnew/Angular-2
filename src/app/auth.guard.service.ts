import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanLoad, Route } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import 'rxjs/add/operator/do';

@Injectable()
//export class AuthGuard implements CanActivate, CanLoad {
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router,
              private authService:AuthService) {}

    canLoad(route: Route): Observable<boolean> | boolean {
      return Observable.of(true);
    }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.authService.isLoggedIn()
    .map( (isLoggedIn) => {

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