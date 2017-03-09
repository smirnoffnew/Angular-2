import { Injectable } from '@angular/core';
import { UserModel } from '../models/UserModel';
import { TokenModel } from '../models/TokenModel';
import { Restangular } from 'ng2-restangular';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/Rx';
import * as _ from 'lodash';

@Injectable()
export class UserService {

  currentUser$ = new ReplaySubject();
  currentToken$ = new ReplaySubject();
  currentTokenLogin$ = new ReplaySubject();

  constructor(public restangular:Restangular) {}
  
  createUser(dataForCreateUser) {
    return this.restangular.all('clients').post(dataForCreateUser)
    .switchMap(data => {
      this.currentUser$.next(new UserModel(data)); //возможность подписки на currentUser$
      return data.all('accessTokens').getList()  //идем на новый урл для получения токена, ID подставляеться по умолчанию
    })
    .map(tokens => { //фильтруем самый новый токен из массива хотя там всегда один объект ))
      return _.maxBy(tokens, 'created');
    })
    .catch((err) => {
      this.currentUser$.error(err);
      return Observable.throw(err)
    })
    .filter(token => token) //не попадем в подписку если запрос обрветься и серевер не вернет ошибку
    .map(token => new TokenModel(token)) //создаем четкую модель токена без методов рест ангуляра
    .map(token => {  //возможность подписки на currentToken$
      this.currentToken$.next(token);
      return token;
    });
    
  }
  
  authenticateUser(email:string, password:string) {
    return this.restangular.all('/clients/login').post({email: email, password: password})
      .filter(token => token)
      .map(token => new TokenModel(token))
      .map(token => {
        this.currentTokenLogin$.next(token);
        return token;
      });
  }

  static isEmptyObject(obj) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        return false;
      }
    }
    return true;
  }

}