import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './core/services/auth.service';
import { LogOutService } from './core/services/logout.service';
import { TokenService } from './core/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  private navbarFlag:boolean;
  private currentUser:any;
  private subscribers: any = {};

  constructor( private authService:AuthService,
               private logOutService:LogOutService,
               private tokenService:TokenService,
               private router: Router) {
  }


  ngOnInit(){
    this.subscribers.currentUser = this.authService.currentUser$;
    this.router.events.subscribe( (url:any) => {
      this.navbarFlag = this.tokenService.isTokenExist();
    })
  }


  logout(){
    this.logOutService.LogOuting();
  }

  ngOnDestroy() {
    for (let property in this.subscribers) {
      if ((typeof this.subscribers[property] !== 'undefined') && (this.subscribers[property] !== null)) {
        this.subscribers[property].unsubscribe();
      }
    }
  }

}

