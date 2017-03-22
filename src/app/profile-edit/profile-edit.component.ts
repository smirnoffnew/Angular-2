import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { DestroySubscribers } from "ng2-destroy-subscribers";
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { ProfileModel } from '../models/ProfileModel';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

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
  private data:any = {};
  private cropperSettings:CropperSettings;
  private croppedWidth:number;
  private croppedHeight:number;

  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

  constructor(private profileService:ProfileService,
              private alertService:AlertService,
              private router:Router,
              private authService:AuthService) {

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
      this.cropperSettings.noFileInput = true;
  }

  ngOnInit() { }

    cropped(bounds:Bounds) {
        this.croppedHeight =bounds.bottom-bounds.top;
        this.croppedWidth = bounds.right-bounds.left;
    }

    fileChangeListener( base64, $event? ) {
        let image: any = new Image();
        let that = this;
        if ( base64 ) {
            image.src = base64;
            that.cropper.setImage(image);
        } else {
            let file: File = $event.target.files[0];
            let myReader: FileReader = new FileReader();
            myReader.onloadend = function (loadEvent: any) {
                image.src = loadEvent.target.result;
                that.cropper.setImage(image);
            };
            myReader.readAsDataURL(file);
        }
    }

  addSubscribers() {
    this.profileService.getProfile$.combineLatest(
        this.authService.currentUser$, (profile:any, user:any) => {
          return {profile:profile, user:user }
        }
    ).subscribe(
        (result)=>{
          if (!result.profile.hasOwnProperty('data') && this.router.url == '/profile/' +result.user.username+ '/edit') {
            this.router.navigate(['/profile/' +result.user.username]);
          }
          this.user = result.user;
          this.profile = new ProfileModel(result.profile.data);
          this.fileChangeListener(this.profile.image);
          if (this.profile.birthday == null){
              this.profile.birthday = new Date();
          } else {
              this.profile.birthday = new Date( this.profile.birthday );
          }
        }
    );
  }

  saveProfile() {
    let profileObject = {
      //required fields
      id: this.profile.id,
      clientId: this.profile.clientId,

      image: this.data.image,
      birthday: this.profile.birthday,
      fullname: this.profile.fullname,
      height: this.profile.height,
      phone: this.profile.phone,
      snickersBrand: this.profile.snickersBrand,
      weight: this.profile.weight,
    };

    this.profileService.save(profileObject, this.profile.id).subscribe(
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
