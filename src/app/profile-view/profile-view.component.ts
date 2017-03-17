import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DestroySubscribers } from "ng2-destroy-subscribers";

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
  isProfileExist;
  subscribers: any = {};
  profile:any = {};
  profileForm:any = {};
  
  constructor(private userService:UserService,
              private alertService:AlertService,
              private profileService:ProfileService,
              private activatedRoute:ActivatedRoute ) {
    this.isProfileExist = false;
  }
  
  ngOnInit() {
    this.profile = this.profileService.resolver;
  }
  
  addSubscribers() {
    this.profile.subscribe(
      (data)=>{
        this.isProfileExist = !ProfileViewComponent.isEmptyObject(data.data);
        console.log('   this.isProfileExist', this.isProfileExist);
      }
    )
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
