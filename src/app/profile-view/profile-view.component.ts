import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { DestroySubscribers } from "ng2-destroy-subscribers";
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { ProfileModel } from "../models/ProfileModel";


@Component({
  selector: 'app-profile',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
})
@DestroySubscribers({
  addSubscribersFunc: 'addSubscribers',
  removeSubscribersFunc: 'removeSubscribers',
  initFunc: 'ngOnInit',
  destroyFunc: 'ngOnDestroy',
})
export class ProfileViewComponent implements OnInit {

  profile:any = {};
  isProfileExist:boolean =true;
  canEditProfileFlag:boolean;
  canCreatProfileteFlag:boolean;
  imageExist:boolean;

  constructor(private authService:AuthService,
              private profileService:ProfileService,
              private alertService:AlertService,
              private router:Router,
              private activatedRoute:ActivatedRoute) {

    this.profile = this.profileService.getProfile$
        .map( (profile) => {
          profile.data = new ProfileModel(profile.data)
          return profile;
        });
  }
  
  ngOnInit() {}
  
  addSubscribers() {
    this.profileService.getProfile$
    .combineLatest( this.activatedRoute.params,
      this.authService.currentUser$, (profile:any, routeParams:any, user:any) => {
        return {profile:profile, routeParams:routeParams, user:user}
      })
      .catch((err) => {
        this.alertService.error(err.data.error.message);
        this.isProfileExist = false;
        return Observable.throw(err);
      })
    .subscribe(
      (result)=>{
        if ( result.profile.hasOwnProperty('data') ){
          this.isProfileExist = true;
          this.imageExist = result.profile.data.hasOwnProperty('image') && result.profile.data.image !== null;
          if (result.routeParams['username'] == result.user.username) {
            this.canEditProfileFlag = true;
          } else {
            this.canEditProfileFlag = false;
          }
        } else {
          this.isProfileExist = false;
          if (result.routeParams['username'] == result.user.username) {
            this.canCreatProfileteFlag = true;
          } else {
            this.canCreatProfileteFlag = false;
          }
        }
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
