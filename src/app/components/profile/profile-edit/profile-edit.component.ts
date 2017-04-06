import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {AlertService} from '../../../core/services/alert.service';
import {AuthService} from '../../../core/services/auth.service';
import {ProfileService} from '../../../core/services/profile.service';
import {ProfileModel} from '../../../models/ProfileModel';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';

@Component({
    selector: 'app-profile-edit',
    templateUrl: 'profile-edit.component.html',
    styleUrls: ['profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

    private subscribers: any = {};
    private profile: any = {};
    private user: any = {};
    private data: any = {};

    private isClickedSave = false;

    private cropperSettings: CropperSettings;
    private profileSubscription: any;

    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

    constructor(private profileService: ProfileService,
                private alertService: AlertService,
                private router: Router,
                private authService: AuthService) {

        this.cropperSettings = new CropperSettings();

        //start croppper border
        this.cropperSettings.width = 300;
        this.cropperSettings.height = 300;

        //botttom image
        this.cropperSettings.croppedWidth = 300;
        this.cropperSettings.croppedHeight = 300;
        this.cropperSettings.canvasWidth = 500;
        this.cropperSettings.canvasHeight = 300;

        this.cropperSettings.minWidth = 10;
        this.cropperSettings.minHeight = 10;

        this.cropperSettings.rounded = true;
        this.cropperSettings.keepAspect = true;

        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
        this.cropperSettings.noFileInput = true;

        this.profile.data = new ProfileModel;
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.subscribers.profileSubscription = this.profileService.getProfileForEdit$

            .combineLatest(this.authService.currentUser$,
                (profile: any, user: any) => {
                    return {profile: profile, user: user}
                })

            .subscribe(
                (result) => {
                    //when user haven't profile
                    if (!result.profile.hasOwnProperty('data') && this.router.url == `/profile' + ${result.user.username} edit`) {
                        this.router.navigate(['/profile', result.user.username]);
                    }

                    this.profile = result.profile;
                    this.user = result.user;

                    if (this.profile.data.image !== null && typeof this.profile.data.image !=='undefined')
                        this.fileChangeListener(this.profile.data.image);

                    if (this.profile.data.birthday == null) {
                        this.profile.data.birthday = new Date();
                    } else {
                        this.profile.data.birthday = new Date(this.profile.data.birthday);
                    }
                }
            );
    }



    fileChangeListener(base64, $event?) {
        let image: any = new Image();
        let that = this;
        if (base64) {
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

    saveProfile() {
        this.isClickedSave = true;
        let profileObject = {
            id: this.profile.data.id,
            clientId: this.profile.data.clientId,
            image: this.data.image,
            birthday: this.profile.data.birthday,
            fullname: this.profile.data.fullname,
            height: this.profile.data.height,
            phone: this.profile.data.phone,
            snickersBrand: this.profile.data.snickersBrand,
            weight: this.profile.data.weight,
        };

        this.subscribers.savedProfileSubscription = this.profileService.save(profileObject, this.profile.data.id)
            .subscribe(
                (data) => {
                    this.alertService.success('Your profile successfully saved');
                    this.router.navigate(['profile/', this.user.username]);
                    this.profileService.selfProfileAlreadyGetting.data = new ProfileModel(data);
                },
                (error) => {
                    this.alertService.error(error.data.error.message);
                }
            );
    }

    ngOnDestroy() {
        for (let property in this.subscribers) {
            if ((typeof this.subscribers[property] !== 'undefined') && (this.subscribers[property] !== null)) {
                this.subscribers[property].unsubscribe();
            }
        }
    }

}
