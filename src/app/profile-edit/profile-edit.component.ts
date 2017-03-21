import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { DestroySubscribers } from "ng2-destroy-subscribers";
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { ProfileModel } from '../models/ProfileModel';

@DestroySubscribers({
  addSubscribersFunc: 'addSubscribers',
  removeSubscribersFunc: 'removeSubscribers',
  initFunc: 'ngOnInit',
  destroyFunc: 'ngOnDestroy',
})
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  private profile:any = {};
  private user:any = {};
  constructor(private profileService:ProfileService,
              private alertService:AlertService,
              private router:Router,
              private authService:AuthService) {
  }

  ngOnInit() { }

  addSubscribers() {
    this.profileService.getProfile$.combineLatest(
        this.authService.currentUser$, (profile:any, user:any) => {
          return {profile:profile, user:user }
        }
    ).subscribe(
        (result)=>{
          if (!result.profile.hasOwnProperty('data') && this.router.url == '/profile/' +result.user.username+ '/edit') {
            this.router.navigate(['/profile/' +result.user.username]);
            console.log('profile+result.user.username');
          }
          this.user = result.user;
          this.profile = new ProfileModel(result.profile.data);
          this.profile.birthday = new Date( this.profile.birthday );
        }
    );
  }

  saveProfile() {
    let profileObject = {
      //required fields
      id: this.profile.id,
      clientId: this.profile.clientId,

      birthday: this.profile.birthday,
      fullname: this.profile.fullname,
      height: this.profile.height,
      phone: this.profile.phone,
      snickersBrand: this.profile.snickersBrand,
      weight: this.profile.weight,

    };
    this.profileService.save(profileObject, this.profile.id).subscribe(
      (data)=>{
        //this.alertService.success('Successfully saved');
        this.router.navigate(['profile/' + this.user.username]);
      },
      (error)=>{
        this.alertService.error(error.data.error.message);
      }
    );
  }

}
