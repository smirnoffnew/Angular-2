import { Component, OnInit, ViewChild } from '@angular/core';
import { FeedService } from '../../../core/services/feed.service';
import { AlertService } from '../../../core/services/alert.service';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { Router }   from '@angular/router';


@Component({
  selector: 'app-feed',
  templateUrl: 'feed-create.component.html',
  styleUrls: ['feed-create.component.css']
})
export class FeedCreateComponent implements OnInit {

  private cropperSettings:CropperSettings;
  private croppedWidth:number;
  private croppedHeight:number;
  private newPost:any;
  private data:any;

  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

  constructor(private feedService:FeedService,
              private alertService:AlertService,
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
    this.cropperSettings.noFileInput = false;
    this.newPost = {};
    this.data = {};
  }

  ngOnInit() {}

  cropped(bounds:Bounds) {
    this.croppedHeight =bounds.bottom-bounds.top;
    this.croppedWidth = bounds.right-bounds.left;
  }

  savePost() {
    this.feedService.saveFeedPost({
      title: this.newPost.title,
      image: this.data.image
    }).subscribe(
        (data)=>{
          this.alertService.success('You Successfully Created Post');
          this.router.navigate(['/feed']);
        },
        (error)=>{
          this.alertService.error(error.data.error.message);
        }
    );
  }
}
