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
  private newPost: any;
  private data: any;

  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor( private alertService: AlertService,
               private feedService:FeedService,
               private postService: PostService,
               private router: Router) {

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
    this.cropperSettings.noFileInput = false;
    this.newPost = {};
    this.data = {};
  }

  ngOnInit() {
  }

  cropped(bounds: Bounds) {
    this.croppedHeight = bounds.bottom - bounds.top;
    this.croppedWidth = bounds.right - bounds.left;
  }

  savePost() {
    this.postService.saveFeedPost({
      title: this.newPost.title,
      image: this.data.image,
      feedId: this.feedService.selfFeedIdObject.id
    }).subscribe(
        (data) => {
          this.alertService.success('You Successfully Created Post');
          this.router.navigate(['/feed']);
        },
        (error) => {
          this.alertService.error(error.data.error.message);
        }
    );
  }
}
