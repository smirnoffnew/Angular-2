import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../core/services/profile.service';
import { DestroySubscribers } from "ng2-destroy-subscribers";
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';
import { ActivatedRoute  }   from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs/Rx';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile-view.component.html',
  styleUrls: ['profile-view.component.css'],
})
@DestroySubscribers({
  addSubscribersFunc: 'addSubscribers',
  removeSubscribersFunc: 'removeSubscribers',
  initFunc: 'ngOnInit',
  destroyFunc: 'ngOnDestroy',
})
export class ProfileViewComponent implements OnInit {
  private user:any;
  private profile:any = {};
  private subscribers:any = {};
  private isProfileExist:boolean =true;
  private canEditProfileFlag:boolean;
  private canCreatProfileteFlag:boolean;
  private imageExist:boolean;


  constructor(private authService:AuthService,
              private profileService:ProfileService,
              private alertService:AlertService,
              private activatedRoute:ActivatedRoute) {

    this.profile = this.profileService.getProfile$;
  }

  ngOnInit(){}

  ngAfterViewInit() {
    this.subscribers.profileSubscription = this.profileService.getProfile$
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

  ngOnDestroy() {
    for (let property in this.subscribers) {
      if ( (typeof this.subscribers[property] !== 'undefined') && (this.subscribers[property] !== null) ) {
        this.subscribers[property].unsubscribe();
      }
    }
  }
  
}
