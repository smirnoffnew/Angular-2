import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class ViewProfileResolverService implements Resolve<any> {
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
      if (route.params['username']===undefined) {
        this.router.navigate(['/profile/' + this.user.username]);
      } else {
          this.profileService.get( route.params['username'] ).subscribe(
              (response)=>{
                  this.profileService.getProfile$.next(response);
              },
              ()=>{ console.log('neudacha'); }
          );

      }
  }
}
