import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from "rxjs/Rx";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import { Restangular } from 'ng2-restangular';
import { TokenService } from './token.service';
import { AlertService } from './alert.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

  public currentUser:any;
  public currentUser$;

  constructor(private restangular:Restangular,
              private tokenService:TokenService,
              private alertService:AlertService,
              private userService:UserService,
              private router:Router) {

    this.currentUser = false;
    this.currentUser$ = new ReplaySubject();
  }

  Registration(dataForCreateUser) {
    this.userService.createUser( dataForCreateUser ).subscribe(
        () => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/feed']);
        },
        (error) => {
          this.alertService.error(error.data.error.message);
        }
    );
  }

  Logging(email:string, pasword:string) {
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

  LoggOuting(){
    this.tokenService.remove();
    this.router.navigate(['/sign-in']);
    this.alertService.success('You left site Successfully');
  }

  isLoggedIn() {

    this.userService.currentUser$.subscribe(
        (user) => {
          this.currentUser = user;
        }
    );


    let returnedObservable$ = Observable.of( this.tokenService.isTokenExist() )
    .switchMap(data => {
      if ( data ) {
        if ( this.currentUser ) {
          return Observable.of( this.currentUser );
        } else {
          return this.restangular.one('tokens', this.tokenService.get()).one('user').get()
        }
      } else {
        return Observable.of(false);
      }
    })
    .map( (data:any) => {
      if( data ) {
        if( this.currentUser.username !== data.username) {
          this.currentUser = data;
          this.currentUser$.next(data);
        }
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      this.alertService.error(error.data.error.message);
      return Observable.of(false);
    });
    return returnedObservable$;
  }

  getUser(){
    return this.restangular.one('tokens', this.tokenService.get()).one('user').get()
  }

  SocialNetworkAuth(socialNetwork:string) {
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
}