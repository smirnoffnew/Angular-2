import { Injectable } from '@angular/core';
import { Restangular } from 'ng2-restangular';
import { ProfileModel } from '../models/ProfileModel';


@Injectable()
export class ProfileService {

  constructor( private restangular:Restangular ) {}

  set( data:ProfileModel ) {
    return this.restangular.all('profiles').post(data)
  };

}

