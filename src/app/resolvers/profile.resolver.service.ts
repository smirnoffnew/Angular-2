import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class ProfileResolverService implements Resolve<any> {
  private user:any;
  private routeParametr:any;
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
      console.log('ProfileResolverService !');
      if (route.params['username']===undefined) {
        this.router.navigate(['/profile/' + this.user.username]);
      } else {
        this.profileService.resolver = this.profileService.get( route.params['username'] );
      }
  }
}
