import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Router, Resolve}   from '@angular/router';

import {AlertService} from '../services/alert.service';
import {AuthService} from '../services/auth.service';
import {ProfileService} from '../services/profile.service';

@Injectable()
export class EditProfileResolverService implements Resolve<any> {
    private user: any;

    constructor(private authService: AuthService,
                private profileService: ProfileService,
                private router: Router,
                private alertService: AlertService) {
        this.authService.currentUser$.subscribe(
            (data) => {
                this.user = data;
            },
            () => {
                this.user = {};
            }
        )
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { debugger;
        //for ability to edit only your profile
        if (route.parent.params['username'] !== this.user.username) {
            this.router.navigate(['profile/' + this.user.username + '/edit'])
        }

        if (this.profileService.selfProfileAlreadyGetting) {
            this.profileService.getProfileForEdit$.next(this.profileService.selfProfileAlreadyGetting);
        } else {
            this.profileService.get( this.user.username )
                .subscribe(
                    (response) => { debugger;
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
