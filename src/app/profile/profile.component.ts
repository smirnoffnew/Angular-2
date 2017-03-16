import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  profile:any = {};
  profileForm:any = {};
  
  constructor(private userService:UserService,
              private alertService:AlertService,
              private profileService:ProfileService,
              private activatedRoute:ActivatedRoute ) {
    
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log('params[\'id\']', params['username']);
    });
    this.profile = this.profileService.resolver;
    this.profile.subscribe(
      (data)=>{ console.log('profile id', data.data); }
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

}
