import { Component, OnInit, ViewChild } from '@angular/core';
import { DestroySubscribers } from "ng2-destroy-subscribers";
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { FeedService } from '../../../core/services/feed.service';
import { AlertService } from '../../../core/services/alert.service';
import { ActivatedRoute, Router  }   from '@angular/router';
import { ImageCropper } from '../../../../../node_modules/ng2-img-cropper/src/imageCropper';

@Component({
  selector: 'app-feed-edit',
  templateUrl: 'feed-edit.component.html',
  styleUrls: ['feed-edit.component.css']
})
@DestroySubscribers({
  addSubscribersFunc: 'addSubscribers',
  removeSubscribersFunc: 'removeSubscribers',
  initFunc: 'ngOnInit',
  destroyFunc: 'ngOnDestroy',
})
export class FeedEditComponent implements OnInit {

  private cropperSettings:CropperSettings;
  private croppedWidth:number;
  private croppedHeight:number;
  private editablePost:any;
  private data:any;
  private routParams:any;
  private noRunned:boolean = true;
  private subscribers: any = {};

  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

  constructor( private feedService:FeedService,
               private alertService:AlertService,
               private activatedRoute:ActivatedRoute,
               private router:Router) {

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
    this.editablePost = {};
    this.data = {};
  }

  ngOnInit() {
    this.subscribers.routParamsSubscribtion = this.activatedRoute.params.subscribe(
        (params)=>{
          this.routParams = params
        }
    );
  }

  ngAfterViewInit() {
    this.subscribers.postSubscribtion = this.feedService.getSingleFeedPost$.subscribe(
        (post:any)=>{
          this.editablePost = post;
          if (this.noRunned) {
            this.fileChangeListener(post.image);
          }
        }
    );
  }

  cropped(bounds:Bounds) {
    this.croppedHeight =bounds.bottom-bounds.top;
    this.croppedWidth = bounds.right-bounds.left;
  }

  fileChangeListener( base64, $event? ) {
    this.noRunned = false;
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

  savePost() {
    this.editablePost.image = this.data.image;
    this.subscribers.editablePostSubscribtion = this.editablePost.save().subscribe(
        ()=>{
          this.alertService.success('You Successfully changed your post');
          this.router.navigate(['/feed']);

        },
        (error)=>{
          this.alertService.error(error.data.error.message);
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
