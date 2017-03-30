import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './core/services/token.service';
import { AuthService } from './core/services/auth.service';
import { DestroySubscribers } from "ng2-destroy-subscribers";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@DestroySubscribers({
  addSubscribersFunc: 'addSubscribers',
  removeSubscribersFunc: 'removeSubscribers',
  initFunc: 'ngOnInit',
  destroyFunc: 'ngOnDestroy',
})
export class AppComponent implements OnInit{
  private navbarFlag;
  private currentUser:any;
  constructor(private tokenService:TokenService,
              private router: Router,
              private authService:AuthService) {}

  ngOnInit(){
    this.currentUser = this.authService.currentUser$;
  }
  
  addSubscribers() {
    this.router.events.subscribe( (url:any) => {
      this.navbarFlag = this.tokenService.isTokenExist();
    });
  }

  logout(){
    this.authService.LogOuting();
  }
}

