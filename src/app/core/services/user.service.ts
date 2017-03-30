import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs/Rx';

import { TokenModel } from '../../models/TokenModel';
import { UserModel } from '../../models/UserModel';

import { AlertService } from './alert.service';
import { AuthService } from 'ng2-ui-auth';
import { TokenService } from './token.service';

import { Restangular } from 'ng2-restangular';
import * as _ from 'lodash';

@Injectable()
export class UserService {

  public currentUser$ =  new Subject();
  public currentToken$ =  new ReplaySubject(1);
  public currentFeed$;

  constructor(private restangular:Restangular,
              private tokenService:TokenService,
              private socialNetworkService:AuthService,
              private alertService:AlertService) {
  }
  
  createUser(dataForCreateUser) {
    return this.restangular.all('clients').post(dataForCreateUser)
    .switchMap(data => {
      this.currentUser$.next(new UserModel(data));
      return data.all('accessTokens').getList();
    })
    .map(tokens => {
      return _.maxBy(tokens, 'created');
    })
    .catch((error) => {
      this.alertService.error(error.data.error.message);
      return Observable.throw(error);
    })
    .filter(token => token)
    .map(token => {
      this.currentToken$.next( new TokenModel(token) );
      this.tokenService.set( token.id );
      return token;
    })
  }

  authenticateUser(email:string, password:string) { 
    return this.restangular.all('clients/login').post({email: email, password: password})
    .switchMap(data => {
      this.currentToken$.next(new TokenModel(data));
      this.tokenService.set( data.id );
      return this.restangular.one('tokens', data.id).one('user').get();
    })
    .catch((err) => {
      this.currentToken$.error(err);
      return Observable.throw(err);
    })
    .map(user => {
      this.currentUser$.next( new UserModel(user) );
      return user;
    })
  }
  
  socialNetworkAuthenticateUser(socialNetwork){
    return this.socialNetworkService.authenticate(socialNetwork)
    .switchMap(data => {
      let response = data.json();
      this.currentToken$.next(new TokenModel(response.data));
      this.tokenService.set( response.data.id );
      return this.restangular.one('tokens', response.data.id).one('user').get();
    })
    .catch((err) => {
      this.currentToken$.error(err);
      return Observable.throw(err);
    })
    .map(user => {
      this.currentFeed$ = this.restangular.one('clients', user.id).one('feed').get();
      this.currentUser$.next( new UserModel(user) );
      return user;
    })
  }

  
}