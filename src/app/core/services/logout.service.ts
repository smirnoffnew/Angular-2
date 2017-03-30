import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { FeedService } from './feed.service';
import { TokenService } from './token.service';
import { ProfileService } from './profile.service';


@Injectable()
export class LogOutService {
    constructor( private router: Router,
                 private alertService:AlertService,
                 private authService:AuthService,
                 private feedService:FeedService,
                 private tokenService:TokenService,
                 private profileService:ProfileService) {
    }

    LogOuting(){
        this.authService.currentUser = false;
        this.profileService.selfProfileAlreadyGetting = false;
        this.feedService.feedIdObject = false ;
        this.tokenService.remove();
        this.router.navigate(['/sign-in']);
        this.alertService.success('You left site Successfully');
    }
}

