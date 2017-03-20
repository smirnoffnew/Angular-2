import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class EditProfileResolverService implements Resolve<any> {
  private user:any;

  constructor(private authService:AuthService,
              private profileService:ProfileService,
              private router: Router)
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
    this.profileService.getProfile$ = this.profileService.get( this.user.username );
  }
}
