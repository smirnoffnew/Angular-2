import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class AuthenticationService {

  private cookieName:string = 'currentUser';
  constructor(private userService:UserService) {}

  login(email: string, password: string) {
    if ( this.userService.check(email, password) ) {
      this.setCookie( this.cookieName, email, {});
      return true;
    } else {
      return false;
    }
  }

  logout() {
    // remove user from cookie
    this.deleteCookie ( this.cookieName );
  }

  private setCookie(name, value, options) {
    options = options || {};
    var expires = options.expires;
    if (typeof expires == "number" && expires) {
      var d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString();
    }
    value = encodeURIComponent(value);
    var updatedCookie = name + "=" + value;
    for (var propName in options) {
      updatedCookie += "; " + propName;
      var propValue = options[propName];
      if (propValue !== true) {
        updatedCookie += "=" + propValue;
      }
    }
    document.cookie = updatedCookie;
  };

  private deleteCookie(name) {
    this.setCookie(name, "", {
      expires: -1
    })
  }
}