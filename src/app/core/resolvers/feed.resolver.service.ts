import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { ProfileModel } from '../../models/ProfileModel';

@Injectable()
export class FeedResolverService implements Resolve<any> {
  constructor(private profileService:ProfileService) {}
  resolve() {


  }
}