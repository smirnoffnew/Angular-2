import { Component, OnInit } from '@angular/core';
import { DestroySubscribers } from "ng2-destroy-subscribers";
import { ProfileService } from '../../../core/services/profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';
import { Router } from '@angular/router';
import { CropperSettings, Bounds } from 'ng2-img-cropper';

@DestroySubscribers({
  addSubscribersFunc: 'addSubscribers',
  removeSubscribersFunc: 'removeSubscribers',
  initFunc: 'ngOnInit',
  destroyFunc: 'ngOnDestroy',
})
@Component({
  selector: 'app-profile-create',
  templateUrl: 'profile-create.component.html',
  styleUrls: ['profile-create.component.css']
})
export class ProfileCreateComponent implements OnInit {
  private profile:any = {};
  private user:any = {};
  private data:any = {};
  private cropperSettings:CropperSettings;
  private croppedWidth:number;
  private croppedHeight:number;

  constructor(private profileService:ProfileService,
              private authService:AuthService,
              private router:Router,
              private alertService:AlertService) {

      this.cropperSettings = new CropperSettings();
      this.cropperSettings.width = 200;
      this.cropperSettings.height = 200;
      this.cropperSettings.croppedWidth = 200;
      this.cropperSettings.croppedHeight = 200;
      this.cropperSettings.canvasWidth = 500;
      this.cropperSettings.canvasHeight = 300;
      this.cropperSettings.minWidth = 10;
      this.cropperSettings.minHeight = 10;
      this.cropperSettings.rounded = false;
      this.cropperSettings.keepAspect = false;
      this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
      this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
      this.cropperSettings.noFileInput = false;
  }

  ngOnInit() {}

  cropped(bounds:Bounds) {
    this.croppedHeight =bounds.bottom-bounds.top;
    this.croppedWidth = bounds.right-bounds.left;
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let reader  = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.profile.image = reader.result;
        };
    }
  }

  addSubscribers() {
    this.profileService.getProfile$.combineLatest(
        this.authService.currentUser$, (profile:any, user:any) => {
          return {profile:profile, user:user }
        }
    ).subscribe(
        (result)=>{
          if (result.profile.hasOwnProperty('data') && this.router.url == '/profile/' +result.user.username+ '/create') {
            this.router.navigate(['/profile/' +result.user.username]);
          }
          this.user = result.user;
          this.profile.birthday = new Date('1985.01.01');
        }
    );
  }

  saveProfile() {
    let profileObject = {
      //required fields
      clientId: this.user.id,

      birthday: this.profile.birthday,
      fullname: this.profile.fullname,
      height: this.profile.height,
      phone: this.profile.phone,
      snickersBrand: this.profile.snickersBrand,
      weight: this.profile.weight,
      image: this.data.image
    };
    this.profileService.create(profileObject).subscribe(
        (data)=>{
          this.alertService.success('Successfully saved');
          this.router.navigate(['profile/' + this.user.username]);
        },
        (error)=>{
          this.alertService.error(error.data.error.message);
        }
    );
  }
}
