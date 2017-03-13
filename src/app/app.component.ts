import { Component } from '@angular/core';
import { TokenService } from './services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private navbarFlag;
  constructor(private tokenService:TokenService, router: Router) {
    router.events.subscribe( (url:any) => {
      //console.log('url', url);
      this.navbarFlag = this.tokenService.isAuthorized();
    });
  }
  title = 'app works!';
}
