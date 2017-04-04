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
        this.cropperSettings.width = 300;
        this.cropperSettings.height = 300;
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
        this.editablePost = {};
        this.data = {};
    }

    ngOnInit() {
        this.subscribers.routParamsSubscribtion = this.activatedRoute.params.subscribe(
            (params) => {
                this.routParams = params
            }
        );
    }

    ngAfterViewInit() {
        this.subscribers.postSubscribtion = this.postService.getSingleFeedPost$.subscribe(
            (post: any) => {
                this.editablePost = post;
                this.fileChangeListener(post.image);
            }
        );
    }

    cropped(bounds: Bounds) {
        this.croppedHeight = bounds.bottom - bounds.top;
        this.croppedWidth = bounds.right - bounds.left;
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
        this.editablePost.image = this.data.image;
        this.subscribers.editablePostSubscribtion = this.editablePost.save().subscribe(
            () => {
                this.alertService.success('You Successfully changed your post');
                this.router.navigate(['/feed']);

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
