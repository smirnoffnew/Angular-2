import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
  constructor() { }

  login(username: string, password: string) {

  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}