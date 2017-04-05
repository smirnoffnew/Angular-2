import {Component, OnInit, ViewChild} from '@angular/core';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
import {FeedService} from '../../../../core/services/feed.service';
import {PostService} from '../../../../core/services/post.service';
import {AlertService} from '../../../../core/services/alert.service';
import {ActivatedRoute, Router}   from '@angular/router';


@Component({
    selector: 'app-post-edit',
    templateUrl: 'post-edit.component.html',
    styleUrls: ['post-edit.component.css']
})
export class PostEditComponent implements OnInit {

    private cropperSettings: CropperSettings;
    private croppedWidth: number;
    private croppedHeight: number;
    private editablePost: any = {};
    private data: any = {};
    private subscribers: any = {};
    private routParams: any = {};

    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

    constructor(private feedService: FeedService,
                private alertService: AlertService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private postService: PostService) {

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 100;
        this.cropperSettings.height = 100;
        this.cropperSettings.croppedWidth = 400;
        this.cropperSettings.croppedHeight = 400;
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

    ngOnInit() {
        this.subscribers.routParamsSubscribtion = this.activatedRoute.params.subscribe(
            (params) => {
                this.routParams = params
            }
        );
    }

    cropped(bounds: Bounds) {

        let Ymax = 300;
        let Xmax = 500;
        let factor = 1;

        let Y = bounds.bottom - bounds.top;
        let X = bounds.right - bounds.left;


        if ( Y >= Ymax  || X >= Xmax) {
            if ( Y > Ymax ) {
                factor = this.getScalingFactorLower(Y, Ymax);
                this.croppedHeight  = factor * Y;
                this.croppedWidth = factor * X;
                if ( this.croppedWidth > Xmax) {
                    factor = this.getScalingFactorLower(this.croppedWidth, Xmax);
                    this.croppedHeight = factor * this.croppedHeight;
                    this.croppedWidth = factor * this.croppedWidth;
                }
            } else {
                factor = this.getScalingFactorLower(X, Xmax);
                this.croppedHeight = factor * Y;
                this.croppedWidth = factor * X;
                if ( this.croppedHeight > Ymax) {
                    factor = this.getScalingFactorLower(this.croppedWidth, Ymax);
                    this.croppedHeight = factor * this.croppedHeight;
                    this.croppedWidth = factor * this.croppedWidth;
                }
            }

        } else {
            if ( Y < Ymax ) {
                factor = this.getScalingFactorApper(Y, Ymax);
                this.croppedHeight  = factor * Y;
                this.croppedWidth = factor * X;
                if ( this.croppedWidth > Xmax) {
                    factor = this.getScalingFactorLower(this.croppedWidth, Xmax);
                    this.croppedHeight = factor * this.croppedHeight;
                    this.croppedWidth = factor * this.croppedWidth;
                }
            } else {
                factor = this.getScalingFactorApper(X, Xmax);
                this.croppedHeight = factor * Y;
                this.croppedWidth = factor * X;
                if ( this.croppedHeight > Ymax) {
                    factor = this.getScalingFactorLower(this.croppedWidth, Ymax);
                    this.croppedHeight = factor * this.croppedHeight;
                    this.croppedWidth = factor * this.croppedWidth;
                }
            }
        }

        this.cropperSettings.croppedWidth = X;
        this.cropperSettings.croppedHeight = Y;
    }


    getScalingFactorLower( Actual, Maximum ){
        let diff = Actual - Maximum;
        let percent = (100 * diff)/Actual;
        return Math.abs((100 - percent)/100);
    }

    getScalingFactorApper( Actual, Maximum ){
        let diff = Actual - Maximum;
        let percent = (100 * diff)/Actual;
        return Math.abs(percent/100) ;
    }


    ngAfterViewInit() {
        this.subscribers.postSubscribtion = this.postService.getSingleFeedPost$.subscribe(
            (post: any) => {
                this.editablePost = post;
                this.fileChangeListener(post.image);
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

    savePost() {

        let image = new Image();
        let that = this;
        image.onload = function() {

            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');

            canvas.width = that.cropperSettings.croppedWidth;
            canvas.height = that.cropperSettings.croppedHeight;

            ctx.drawImage(this, 0, 0, that.cropperSettings.croppedWidth, that.cropperSettings.croppedHeight);

            that.editablePost.image = canvas.toDataURL();
            that.subscribers.editablePostSubscribtion = that.editablePost.save().subscribe(
                () => {
                    that.alertService.success('You Successfully changed your post');
                    that.router.navigate(['/feed']);

                },
                (error) => {
                    that.alertService.error(error.data.error.message);
                }
            );
        };

        image.src = this.data.image;
    }

    ngOnDestroy() {
        for (let property in this.subscribers) {
            if ((typeof this.subscribers[property] !== 'undefined') && (this.subscribers[property] !== null)) {
                this.subscribers[property].unsubscribe();
            }
        }
    }


}
