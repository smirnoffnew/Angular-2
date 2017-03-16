import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private navbarFlag;
  constructor(private tokenService:TokenService,
              private router: Router,
              private authService:AuthService) {}

  ngOnInit(){
    this.router.events.subscribe( (url:any) => {
      this.navbarFlag = this.tokenService.isTokenExist();
    });
  }

  logout(){
    this.authService.LoggOuting();
  }
}
