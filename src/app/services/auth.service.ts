import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from "rxjs/Rx";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Restangular } from 'ng2-restangular';
import { TokenService } from '../services/token.service';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  public currentUser:any;
  public token:string;
  public flag:boolean;

  currentUser$ = new ReplaySubject();

  constructor(private restangular:Restangular,
              private tokenService:TokenService,
              private alertService:AlertService,
              private userService:UserService,
              private router:Router) {
    this.currentUser = {};
    this.token = this.tokenService.get();
    this.currentUser$ = new ReplaySubject();
  }


  isLoggedIn():Observable<boolean> { 
    //let returnedObservable$ = this.tokenService.isTokenExist() ? this.restangular.one('tokens', this.token).one('user').get() : Observable.of(false)

    //console.log( 'this.tokenService.isTokenExist()', this.tokenService.isTokenExist());
    let returnedObservable$ = Observable.of( this.tokenService.isTokenExist() )
    .switchMap(data => {
      if ( data ) { 
        return this.restangular.one('tokens', this.token).one('user').get()
      } else {
        return Observable.of(false);
      }
    })
    .map( (data) => {
      if( data ) { 
        this.currentUser$.next(data);
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => { 
      this.alertService.error( err.json() );
      return Observable.of(false);
    });
    return returnedObservable$;
  }
  
  //Logging(email:string, pasword:string) {
  //  this.userService.authenticateUser(email, pasword).subscribe();
  //  this.userService.currentToken$.subscribe(
  //    ( token ) => {
  //      //console.log('token token token token', token);
  //      this.alertService.success('Authentication successful', true);
  //      this.tokenService.set(token.id);
  //      this.router.navigate(['/feed']);
  //    },
  //    ( error ) => {
  //      this.alertService.error(error.data.error.message);
  //    }
  //  )
  //}
  
  //Registration(email:string, pasword:string) {
  //  this.userService.authenticateUser(email, pasword);
  //  this.userService.currentToken$.subscribe(
  //    (token)=> { this.tokenService.set(token.id) }
  //  )
  //}
}