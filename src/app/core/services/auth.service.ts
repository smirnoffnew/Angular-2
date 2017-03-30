import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, ReplaySubject} from "rxjs/Rx";
import {Restangular} from 'ng2-restangular';

import {AlertService} from './alert.service';
import {TokenService} from './token.service';
import {UserService} from './user.service';

@Injectable()
export class AuthService {

    public currentUser: any = false;
    public currentUser$ = new ReplaySubject(1);
    public subscribers:any = {};

    constructor( private router: Router,
                 private restangular: Restangular,
                 private alertService: AlertService,
                 private tokenService: TokenService,
                 private userService: UserService) {
    }

    Registration(dataForCreateUser) {
        this.userService.createUser(dataForCreateUser).subscribe(
            () => {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/feed']);
            },
            (error) => {
                this.alertService.error(error.data.error.message);
            }
        );
    }

    Logging(email: string, pasword: string) {
        this.userService.authenticateUser(email, pasword).subscribe(
            () => {
                this.alertService.success('Authentication successful', true);
                this.router.navigate(['/feed']);
            },
            (error) => {
                this.alertService.error(error.data.error.message);
            }
        );
    }

    SocialNetworkAuth(socialNetwork: string) {
        this.userService.socialNetworkAuthenticateUser(socialNetwork)
            .subscribe(
                () => {
                    this.alertService.success('Google Authorization successful', true);
                    this.router.navigate(['/feed']);
                },
                (error) => {
                    this.alertService.error(error.data.error.message);
                }
            );
    }


    isLoggedIn() {

        //save user into auth when application start from login page or registration page
        this.subscribers.userServiceSubscription = this.userService.currentUser$.subscribe(
            (user) => {
                this.currentUser = user;
                this.subscribers.userServiceSubscription.unsubscribe();
            }
        );

        let returnedObservable$ = Observable.of(this.tokenService.isTokenExist())
            .switchMap(data => {
                if (data) {
                    if (this.currentUser) {
                        return Observable.of(this.currentUser);
                    } else {
                        return this.restangular.one('tokens', this.tokenService.get()).one('user').get()
                    }
                } else {
                    return  Observable.of(data);
                }
            })
            .map((data: any) => {
                if (data) {
                    this.currentUser = data;
                    this.currentUser$.next(data);
                    return true;
                } else {
                    return data;
                }
            })
            .catch((error) => {
                this.alertService.error(error.data.error.message);
                return Observable.of(false);
            });
        return returnedObservable$;
    }
}