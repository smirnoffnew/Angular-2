import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { DestroySubscribers } from "ng2-destroy-subscribers";
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs/Rx';

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
  subscribers: any = {};
  profile:any = {};
  isProfileExist:boolean =true;
  canEditProfileFlag:boolean;
  canCreatProfileteFlag:boolean;

  
  constructor(private authService:AuthService,
              private profileService:ProfileService,
              private alertService:AlertService,
              private router:Router,
              private activatedRoute:ActivatedRoute) {

    this.profile = this.profileService.getProfile$;
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
  
  saveProfile(){
    
    //let data = new ProfileModel({
    //  birthday: this.profile.date_of_birth,
    //  fullname: this.profile.full_name,
    //  phone: this.profile.phone_number,
    //  height: +this.profile.height,
    //  weight: +this.profile.weight,
    //  snickersBrand: this.profile.favorite_sneakers_brand,
    //  image: '',
    //  id: '',
    //  clientId: user.id
    //});
    //
    //console.log('data', data);
    //
    //this.profileService.set(data)
    //.subscribe(
    //  (data) => {
    //    console.log('currentProfile$ data', data);
    //  },
    //  (error) => {
    //    let res = error.json();
    //    this.alertService.error(res.error.message);
    //  }
    //);
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
