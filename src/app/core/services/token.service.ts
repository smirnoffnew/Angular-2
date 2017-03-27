import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class TokenService {
  
  private currentUser:string;
  private options:any;
  
  constructor(private _cookieService:CookieService) {
    let data = new Date(2020, 1, 28);
    this.options = {
      expires:data
    };
    this.currentUser = 'currentUser';
  }

  get(){
    return this._cookieService.get( this.currentUser );
  }

  set(value:any){
    this._cookieService.put( this.currentUser, value, this.options );
  }

  remove(){
    this._cookieService.remove(this.currentUser);
  }

  isTokenExist(){
    return  typeof (this._cookieService.get( this.currentUser ) ) !== 'undefined';
  }

}

