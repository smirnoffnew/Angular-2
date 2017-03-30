import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Router, Resolve } from '@angular/router';

import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class ViewProfileResolverService implements Resolve<any> {
  private user:any;

  constructor(private authService:AuthService,
              private profileService:ProfileService,
              private router: Router,
              private alertService:AlertService)
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

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      //for ability to redirect your profile when profile doesn't exist
      if (route.params['username']===undefined) {
        this.router.navigate(['/profile/' + this.user.username]);
      } else {
          if ( route.params['username'] == this.user.username && this.profileService.selfProfileAlreadyGetting) {
              this.profileService.getProfileForView$.next(this.profileService.selfProfileAlreadyGetting);
          } else {
              this.profileService.get( route.params['username'] ).subscribe(
                  (response)=>{
                      this.profileService.getProfileForView$.next(response);
                      if (route.params['username'] == this.user.username){
                          this.profileService.getProfileForEdit$.next(response);
                          this.profileService.selfProfileAlreadyGetting = response;
                      }
                  },
                  ( error )=>{
                      this.alertService.error(error.data.error.message);
                  }
              );
          }
      }
  }
}
