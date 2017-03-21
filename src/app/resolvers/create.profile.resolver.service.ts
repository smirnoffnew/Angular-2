import { Injectable } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Router, ActivatedRoute, Resolve }   from '@angular/router';

@Injectable()
export class CreateProfileResolverService implements Resolve<any> {
    private user:any;
    constructor(private authService:AuthService,
                private profileService:ProfileService,
                private router: Router,
                private activatedRoute:ActivatedRoute)
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
        if ( route.parent.params['username'] !== this.user.username) {
            this.router.navigate(['profile/' + this.user.username + '/create'])
        }
    }
}
