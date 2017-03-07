import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private cookieName:string = 'currentUser';
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    //сами идем на логин незарегестрированные
    if ( !this.getCookie(this.cookieName) && (state.url=='/sign-in' || state.url=='/sign-up') ) {
      return true;
    }

    //залогиненые идем на логин перебрасываем на feed
    if ( this.getCookie(this.cookieName) && (state.url=='/sign-in' || state.url=='/sign-up') ) {
      this.router.navigate(['/feed']);
      return false;
    }

    //залогиненые на логаут
    if ( this.getCookie(this.cookieName) && state.url=='/sign-out') {
      this.authenticationService.logout();
      this.router.navigate(['/sign-in']);
      return true;
    }

    if ( this.getCookie(this.cookieName) ) {
      //залогиненные идем на скрытый урл
      return true;
    } else {
      // не залогиненых всегда кидаем на логин
      this.router.navigate(['/sign-in']);
      return false;
    }

  }

  getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
}