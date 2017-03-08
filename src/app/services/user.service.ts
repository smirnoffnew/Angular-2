import { Injectable } from '@angular/core';
import { UserModel } from '../models/UserModel';
import { TokenModel } from '../models/TokenModel';
import { Restangular } from 'ng2-restangular';
import 'rxjs/Rx';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import * as _ from 'lodash';
console.log(_);

@Injectable()
export class UserService {

  currentUser$ = new ReplaySubject();
  currentToken$ = new ReplaySubject();

  constructor(public restangular:Restangular) {
  }

  create(dataForCreateUser) {
    return this.restangular.all('clients').post(dataForCreateUser)
    .switchMap(data => {
      this.currentUser$.next(new UserModel(data));
      
      //идем на новый урл для получения токена, ID подставляеться по умолчанию
      return data.all('accessTokens').getList()
    })

    //фильтруем самый новый токен
    .map(tokens => {
      return _.maxBy(tokens, 'created');
    })

    //не попадем в подписку если запрос обрветься и серевер не вернет ошибку
    .filter(token => token)

    //создаем четкую модель токена без методов рест ангуляра
    .map(token => new TokenModel(token))

    //для подписки на свойство класса
    .map(token => {
      this.currentToken$.next(token);
      return token;
    });
    
  }


  private getToken(id:string):any {
    this.restangular.one('/clients/' + id + '/accessTokens').get().subscribe(
      (data) => {
        return data[0].id;
      },
      (error) => {
        console.log('error', error.data.error.message);
        return '';
      }
    );
  }

  checkUser(email:string, password:string) {
    this.restangular.all('/clients/login').post({email: email, password: password}).subscribe(
      (data) => {
        return {
          status: UserService.isEmptyObject(this.getUserByToken(data.id)),
          user: this.getUserByToken(data.id),
          token: data.id
        }
      },
      (error) => {
        console.log('error', error.data.error.message);
        return {
          status: false,
          user: {},
          token: ''
        }
      });
  }

  private getUserByToken(token:string) {
    this.restangular.one('/tokens/' + token + '/user').get().subscribe(
      (data) => {
        return {
          email: data.email,
          username: data.username,
          id: data.id
        };
      },
      (error) => {
        console.log('error', error.data.error.message);
        return {};
      }
    );
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