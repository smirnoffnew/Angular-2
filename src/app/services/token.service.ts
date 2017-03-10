import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class TokenService {
  
  private currentUser:string;
  private exdays:number;
  
  constructor() {
    this.currentUser = 'currentUser';
    this.exdays = 300;
  }
  
  get() {
    return Cookie.get(this.currentUser);
  }
  
  set( value:string ) {
    Cookie.set(this.currentUser, value, this.exdays);
  };
  
  update( value:string ) {
    Cookie.delete(this.currentUser);
    Cookie.set(this.currentUser, value, this.exdays);
  }
  
  delete() {
    Cookie.delete(this.currentUser);
  }
  
  isAuthorized(){
    return !Cookie.get(this.currentUser) === null;
  }
}