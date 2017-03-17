import { Injectable } from '@angular/core';
import { UserModel } from '../models/UserModel';
import { TokenModel } from '../models/TokenModel';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { TokenService } from '../services/token.service';
import { Restangular } from 'ng2-restangular';
import { AuthService } from 'ng2-ui-auth';
import 'rxjs/Rx';
import * as _ from 'lodash';

@Injectable()
export class UserService {
  public currentUser$;
  public currentToken$;
  constructor(private restangular:Restangular,
              private tokenService:TokenService,
              private socialNetworkService:AuthService) 
  {
    this.currentUser$ = new ReplaySubject();
    this.currentToken$ = new ReplaySubject();
  }
  
  createUser(dataForCreateUser) {
    return this.restangular.all('clients').post(dataForCreateUser) //http://2muchcoffee.com:53000/api/clients
    .switchMap(data => {
      this.currentUser$.next(new UserModel(data));
      return data.all('accessTokens').getList();  //идем на новый урл для получения токена, ID подставляеться по умолчанию
    }) //http://2muchcoffee.com:53000/api/clients/58c662e7292db74b49090d3f/accessTokens
    .map(tokens => {
      return _.maxBy(tokens, 'created');
    })
    .catch((err) => {
      this.currentUser$.error(err);
      return Observable.throw(err);
    })
    .filter(token => token) //не попадем в подписку если запрос обрветься и серевер не вернет ошибку
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
      this.currentUser$.next( new UserModel(user) );
      return user;
    })
  }

  
  //getUserProfile() {
  //  if ( UserService.isEmptyObject(this.currentUser) ) {
  //    return this.restangular.one('tokens', this.tokenService.get()).one('user').get()
  //    .switchMap(data => {
  //      this.currentUser$.next(new UserModel(data));
  //      return this.restangular.one('clients', data.username).one('get-profile').get();
  //    })
  //    .catch((err) => {
  //      return Observable.throw(err);
  //    })
  //    .map(profile => {
  //      return profile;
  //    });
  //  } else {
  //    return this.restangular.one('clients', this.currentUser.username).one('get-profile').get();
  //  }
  //}
  //


}