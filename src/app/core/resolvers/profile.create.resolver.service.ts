import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class CreateProfileResolverService implements Resolve<any> {

    private user:any;

    constructor( private alertService:AlertService,
                 private authService:AuthService,
                 private router: Router,
                 private profileService:ProfileService )
    {
        this.authService.currentUser$.subscribe(
            (data)=>{
                this.user = data;
            },
            ()=>{
                this.user = {};
            }
        )
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        //for ability to create only your profile
        if ( route.parent.params['username'] !== this.user.username) {
            this.router.navigate(['profile/' + this.user.username + '/create'])
        } else {
            if (this.profileService.selfProfileAlreadyGetting) {
                this.profileService.getProfileForEdit$.next(this.profileService.selfProfileAlreadyGetting);
            } else {
                this.profileService.get( this.user.username )
                    .subscribe(
                        (response) => {
                            this.profileService.getProfileForEdit$.next(response);
                            this.profileService.selfProfileAlreadyGetting = response;
                        },
                        (error) => {
                            this.alertService.error(error.data.error.message);
                        }
                    );
            }

        }


    }
}
