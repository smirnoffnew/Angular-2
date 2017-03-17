import { Injectable } from '@angular/core';
import { Restangular } from 'ng2-restangular';
import { ProfileModel } from '../models/ProfileModel';

@Injectable()
export class ProfileService {
  public resolver:any;
  public getAllResolver:any;
  constructor( private restangular:Restangular ) {}

  set( data:ProfileModel ) {
    return this.restangular.all('profiles').post(data)
  };

  get(username) {
    return this.restangular.one('clients', username).one('get-profile').get();
  }

  getAll(){
    return this.restangular.all('profiles').getList()
  }
}