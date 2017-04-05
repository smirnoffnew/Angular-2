import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }   from '@angular/router';

import { AlertService } from '../../../../core/services/alert.service';
import { FeedService } from '../../../../core/services/feed.service';
import { PostService } from '../../../../core/services/post.service';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';


@Component({
  selector: 'app-post-create',
  templateUrl: 'post-create.component.html',
  styleUrls: ['post-create.component.css']
})

export class PostCreateComponent implements OnInit {

  private cropperSettings: CropperSettings;
  private croppedWidth: number;
  private croppedHeight: number;
  private newPost: any = {};
  private data: any = {};

  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor( private alertService: AlertService,
               private feedService:FeedService,
               private postService: PostService,
               private router: Router) {

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
    this.cropperSettings.noFileInput = false;
  }

  ngOnInit() {
  }

  cropped(bounds: Bounds) {

    let Ymax = 300;
    let Xmax = 500;
    let factor = 1;

    let Y = bounds.bottom - bounds.top;
    let X = bounds.right - bounds.left;


    if ( Y > Ymax  || X > Xmax) {
        if ( Y > Ymax ) {
          factor = this.getScalingFactor(Y, Ymax);
          this.croppedHeight  = factor * Y;
          this.croppedWidth = factor * X;
          if ( this.croppedWidth > Xmax) {
            factor = this.getScalingFactor(this.croppedWidth, Xmax);
            this.croppedHeight = factor * this.croppedHeight;
            this.croppedWidth = factor * this.croppedWidth;
          }
        } else {
          factor = this.getScalingFactor(X, Xmax);
          this.croppedHeight = factor * Y;
          this.croppedWidth = factor * X;
        }

    } else {
      this.croppedHeight = Y;
      this.croppedWidth = X;
    }

    this.cropperSettings.croppedWidth = X;
    this.cropperSettings.croppedHeight = Y;
  }


  getScalingFactor( Actual, Maximum ){
    let diff = Actual - Maximum;
    let percent = (100 * diff)/Actual;
    return (100 - percent)/100;
  }


  savePost() {

    let image = new Image();
    let that = this;
    image.onload = function() {

      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');

      // canvas.width = that.cropperSettings.croppedWidth;
      // canvas.height = that.cropperSettings.croppedHeight;

      canvas.width = document.getElementById('cropedImageCreate').offsetWidth;
      canvas.height = document.getElementById('cropedImageCreate').offsetHeight;


      ctx.drawImage(this, 0, 0, that.cropperSettings.croppedWidth, that.cropperSettings.croppedHeight);

      that.postService.saveFeedPost({
        title: that.newPost.title,
        image: canvas.toDataURL(),
        feedId: that.feedService.selfFeedIdObject.id
      }).subscribe(
          (data) => {
            that.alertService.success('You Successfully Created Post');
            that.router.navigate(['/feed']);
          },
          (error) => {
            that.alertService.error(error.data.error.message);
          }
      );
    };

    image.src = this.data.image;

  }
}
