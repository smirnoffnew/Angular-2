import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { DestroySubscribers } from "ng2-destroy-subscribers";
import { AuthService } from '../services/auth.service';
import { ProfileModel } from '../models/ProfileModel';
import { AlertService } from '../services/alert.service';
import { Router, ActivatedRoute, Params }   from '@angular/router';

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
  isProfileExist:boolean;
  subscribers: any = {};
  profile:any = {};
  editFlag:boolean;
  createFlag:boolean;

  
  constructor(private authService:AuthService,
              private profileService:ProfileService,
              private alertService:AlertService,
              private router:Router,
              private activatedRoute:ActivatedRoute) {
    this.profile = this.profileService.getProfile$;
    this.isProfileExist = true;
  }
  
  ngOnInit() {
    this.activatedRoute.params
    //.switchMap(    (params: Params) => {console.log('params[\'id\']', params['id']); } )
    .subscribe( (params: Params) => {console.log('aaa', params['username']);});

  }
  
  addSubscribers() {


    this.profile.subscribe(
      (data)=>{
        this.isProfileExist = !ProfileViewComponent.isEmptyObject(data.data);
      },
      (error) => {
        let errObject = error.json();
        this.alertService.error(errObject.error.message);
        this.isProfileExist = false;
      }
    );

    this.profileService.getProfile$
    .combineLatest(
      this.authService.currentUser$, (profile:any, user:any) => {

        if ( !profile.hasOwnProperty('data') ){
          profile.data = new ProfileModel({});
          this.isProfileExist = false;
        }
        return profile.data.clientId == user.id;
      })
    .subscribe(
      (result)=>{
        this.editFlag = result;
      }
    );

    this.profileService.getProfile$.subscribe(
      ()=>{

      },
      ()=>{}
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
