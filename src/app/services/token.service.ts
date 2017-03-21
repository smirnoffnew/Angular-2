import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from "rxjs/Rx";
import 'rxjs/add/observable/of';
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class TokenService {
  
  private currentUser:string;
  private exdays:number;
  private options:any;
  
  constructor(private _cookieService:CookieService) {
    let data = new Date(2020, 1, 28);
    this.options = {
      expires:data
    };

    this.currentUser = 'currentUser';
    this.exdays = 300;
  }
  
  //get() {
  //  console.log( 'getting cookie !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', Cookie.get(this.currentUser) );
  //  return this.cookie.get(this.currentUser);
  //}
  //
  get(){
    console.log( 'getting cookie !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', Cookie.get(this.currentUser) );
    return this._cookieService.get( this.currentUser );
  }
  
  //set( value:any ) { debugger;
  //  console.log('setting cookie !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  //  Cookie.set(this.currentUser, value, this.exdays);
  //  debugger;
  //};

  set(value:any){
    console.log( 'getting cookie !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', Cookie.get(this.currentUser) );
    console.log('this.options', this.options);
    this._cookieService.put( this.currentUser, value, this.options );
  }
  
  
  //delete() { debugger;
  //  Cookie.delete(this.currentUser);
  //  console.log('Deleting cookie !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', Cookie.get(this.currentUser) );
  //}

  delete() { debugger;
    this._cookieService.remove(this.currentUser);
  }


  isTokenExist(){
    console.log('typeof (this._cookieService.get( this.currentUser ) ) !== undefined', typeof (this._cookieService.get( this.currentUser ) ) !== 'undefined');
    console.log('this._cookieService.get( this.currentUser )', this._cookieService.get( this.currentUser ) ) ;
    return  typeof (this._cookieService.get( this.currentUser ) ) !== 'undefined';
  }

  //update( value:string ) { debugger;
  //  Cookie.delete(this.currentUser);
  //  Cookie.set(this.currentUser, value, this.exdays);
  //}

  //setCookie(name, value, options) {
  //    options = options || {};
  //    var expires = options.expires;
  //    if (typeof expires == "number" && expires) {
  //      var d = new Date();
  //      d.setTime(d.getTime() + expires * 1000);
  //      expires = options.expires = d;
  //    }
  //    if (expires && expires.toUTCString) {
  //      options.expires = expires.toUTCString();
  //    }
  //    value = encodeURIComponent(value);
  //    var updatedCookie = name + "=" + value;
  //    for (var propName in options) {
  //      updatedCookie += "; " + propName;
  //      var propValue = options[propName];
  //      if (propValue !== true) {
  //        updatedCookie += "=" + propValue;
  //      }
  //    }
  //    document.cookie = updatedCookie;
  //}

  //getCookie(name) {
  //  var matches = document.cookie.match(new RegExp(
  //    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  //  ));
  //  return matches ? decodeURIComponent(matches[1]) : undefined;
  //}
  //
  //deleteCookie(name) {
  //  this.setCookie(name, "", {
  //    expires: -1
  //  })
  //}
  //
  //deleteAllCookies() {
  //  var cookies = document.cookie.split(";");
  //
  //  for (var i = 0; i < cookies.length; i++) {
  //    var cookie = cookies[i];
  //    var eqPos = cookie.indexOf("=");
  //    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  //    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  //  }
  //}
  //
  //clearListCookies()
  //{ debugger;
  //  var cookies = document.cookie.split(";");
  //  for (var i = 0; i < cookies.length; i++)
  //  {
  //    var spcook =  cookies[i].split("=");
  //    deleteCookie(spcook[0]);
  //  }
  //  function deleteCookie(cookiename)
  //  {
  //    var d = new Date();
  //    d.setDate(d.getDate() - 1);
  //    var expires = ";expires="+d;
  //    var name=cookiename;
  //    //alert(name);
  //    var value="";
  //    document.cookie = name + "=" + value + expires + "; path=/acc/html";
  //  }
  //
  //}
}

