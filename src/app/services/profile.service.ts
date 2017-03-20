import { Injectable } from '@angular/core';
import { Restangular } from 'ng2-restangular';
import { ProfileModel } from '../models/ProfileModel';

@Injectable()
export class ProfileService {
  public getProfile$:any;
  public getAllResolver:any;
  constructor( private restangular:Restangular ) {}

  save( data:any, id:string ) {
    return this.restangular.one('profiles', id).patch(data);
  };

  get(username) {
    return this.restangular.one('clients', username).one('get-profile').get();
  }

  getAll(){
    return this.restangular.all('profiles').getList()
  }
}