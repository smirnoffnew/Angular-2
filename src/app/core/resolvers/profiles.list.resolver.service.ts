import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ProfileService } from '../services/profile.service';
import { AlertService } from '../services/alert.service';

@Injectable()
export class ProfilesListResolverService implements Resolve<any> {

  constructor(private alertService:AlertService,
              private profileService:ProfileService) {}
  
  resolve() {
    this.profileService.getAll().subscribe(
        (response)=>{
          this.profileService.getProfilesList$.next(response);
        },
        ( error )=>{
          this.alertService.error(error.data.error.message);
        }
    );
  }
}