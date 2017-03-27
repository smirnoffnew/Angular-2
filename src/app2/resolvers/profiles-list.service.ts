import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ProfilesListResolverService implements Resolve<any> {
  private user:any;
  constructor(private authService:AuthService,
              private profileService:ProfileService)
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
  
  resolve() {
    this.profileService.getAllResolver = this.profileService.getAll();
  }
}