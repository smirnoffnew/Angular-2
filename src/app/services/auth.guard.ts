import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private tokenService: TokenService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    //сами идем на логин незарегестрированные
    if ( !this.tokenService.get() && (state.url=='/sign-in' || state.url=='/sign-up') ) {
      return true;
    }

    //залогиненые идем на логин перебрасываем на feed
    if ( this.tokenService.get() && (state.url=='/sign-in' || state.url=='/sign-up') ) {
      this.router.navigate(['/feed']);
      return false;
    }

    //залогиненые на логаут
    if ( this.tokenService.get() && state.url=='/sign-out') {
      this.tokenService.delete();
      this.router.navigate(['/sign-in']);
      return true;
    }

    if ( this.tokenService.get() ) {
      //залогиненные идем на скрытый урл
      return true;
    } else {
      // не залогиненых всегда кидаем на логин
      this.router.navigate(['/sign-in']);
      return false;
    }

  }
}