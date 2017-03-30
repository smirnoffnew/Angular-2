import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

import { AlertService } from './alert.service';
import { TokenService } from './token.service';
import { ProfileService } from './profile.service';

@Injectable()
export class LogOutService {
    constructor( private router: Router,
                 private alertService:AlertService,
                 private tokenService:TokenService,
                 private profileService:ProfileService) {
    }

    logOut(){
        this.profileService.selfProfileAlreadyGetting = false;
        this.tokenService.remove();
        this.router.navigate(['/sign-in']);
        this.alertService.success('You left site Successfully');
    }


}

