import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Restangular} from 'ng2-restangular';
import {ProfileService} from '../../../core/services/profile.service';
import {ProfileModel} from '../../../models/ProfileModel';
import {TokenService} from '../../../core/services/token.service';
import {AuthService} from '../../../core/services/auth.service';
import {AlertService} from '../../../core/services/alert.service';
import {FeedService} from '../../../core/services/feed.service';

import * as _ from 'lodash';


@Component({
    selector: 'app-profiles-list',
    templateUrl: 'profiles-list.component.html',
    styleUrls: ['profiles-list.component.css']
})

export class ProfilesListComponent implements OnInit {

    private subscribers:any = {};
    private profiles: any = [];
    private user: any = {};
    private isClickedChangeUser:boolean;

    constructor(private profileService: ProfileService,
                private restangular: Restangular,
                private tokenService: TokenService,
                private router: Router,
                private authService: AuthService,
                private feedService: FeedService,
                private alertService: AlertService) {

        this.subscribers.currentUserSubscription = this.authService.currentUser$.subscribe(
            (user) => {
                this.user = user;
            }
        )
    }

    ngOnInit() {
        this.profiles = this.profileService.getProfilesList$.map(
            (data) => {
                let newArr = [];
                _.forEach(data, (value) => {
                    let profile = new ProfileModel(value);
                    profile.isClickedChangeUser = false;
                    newArr.push(profile)
                });
                return newArr;
            }
        );
    }


    changeUser(profile) {
        profile.isClickedChangeUser = true;
        this.subscribers.CahngeUserGEtTokenSubscription = this.restangular.one('clients', profile.clientId).all('accessTokens').getList()
            .subscribe(
                (tokensArray) => {
                    if (tokensArray[0].hasOwnProperty('id')) {
                        this.tokenService.set(tokensArray[0].id);
                        this.authService.currentUser = false;
                        this.profileService.selfProfileAlreadyGetting = false;
                        this.feedService.selfFeedIdObject = false;
                        this.router.navigate(['/user']);
                        setTimeout(function(){  location.reload(); }, 1000);
                    } else {
                        this.alertService.error(' sorian mizhik netu tokena')
                    }
                },
                (error) => {
                    this.alertService.error(error.data.error.message);
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
