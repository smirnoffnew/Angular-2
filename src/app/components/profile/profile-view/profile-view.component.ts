import {Component, OnInit} from '@angular/core';
import {ActivatedRoute}   from '@angular/router';
import {Observable} from 'rxjs/Rx';

import {AuthService} from '../../../core/services/auth.service';
import {AlertService} from '../../../core/services/alert.service';
import {ProfileService} from '../../../core/services/profile.service';


@Component({
    selector: 'app-profile',
    templateUrl: 'profile-view.component.html',
    styleUrls: ['profile-view.component.css'],
})

export class ProfileViewComponent implements OnInit {
    private user: any;
    private profile: any = {};
    private subscribers: any = {};

    private isProfileExist: boolean = false;
    private isImageExist: boolean = false;

    private canEditProfileFlag: boolean = false;
    private canCreatProfileteFlag: boolean = false;

    constructor(private authService: AuthService,
                private profileService: ProfileService,
                private alertService: AlertService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.subscribers.profileSubscription = this.profileService.getProfileForView$

            .combineLatest(
                this.authService.currentUser$,
                this.activatedRoute.params,
                (profile: any, user: any, routeParams: any) => {
                    return {profile: profile, user: user, routeParams: routeParams}
                }
            )

            .catch((error) => {
                    this.alertService.error(error.data.error.message);
                    return Observable.throw(error);
                }
            )

            .subscribe(
                (result) => {
                    if (result.profile.hasOwnProperty('data')) {
                        this.isProfileExist = true;
                        this.profile = result.profile.data;
                        this.isImageExist = result.profile.data.hasOwnProperty('image') && result.profile.data.image !== null;
                        this.canEditProfileFlag = result.routeParams['username'] == result.user.username;
                    } else {
                        this.isProfileExist = false;
                        this.canCreatProfileteFlag = result.routeParams['username'] == result.user.username;
                        this.canEditProfileFlag = result.routeParams['username'] == result.user.username;
                    }
                }
            );
    }

    ngOnDestroy() {
        for (let property in this.subscribers) {
            if ((typeof this.subscribers[property] !== 'undefined') && (this.subscribers[property] !== null)) {
                this.subscribers[property].unsubscribe();
            }
        }
    }

}
