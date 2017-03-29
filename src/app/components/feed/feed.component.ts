import { Component, OnInit, ViewChild } from '@angular/core';
import { FeedService } from '../../core/services/feed.service';
import { DestroySubscribers } from "ng2-destroy-subscribers";
import { AlertService } from '../../core/services/alert.service';
import { AuthService } from '../../core/services/auth.service';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import * as _ from 'lodash';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
@DestroySubscribers({
  addSubscribersFunc: 'addSubscribers',
  removeSubscribersFunc: 'removeSubscribers',
  initFunc: 'ngOnInit',
  destroyFunc: 'ngOnDestroy',
})
export class FeedComponent implements OnInit {

  private cropperSettings:CropperSettings;
  private croppedWidth:number;
  private croppedHeight:number;
  private newPost:any;
  private data:any;
  private posts:any;
  private user:any;
  private subscribers: any = {};

  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

  constructor(private authService:AuthService,
              private feedService:FeedService,
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

    this.newPost = {};
    this.data = {};
    this.user = {};
  }

  ngOnInit() {
    this.subscribers.feedPostsSubscribtion = this.feedService.getFeedPosts$.subscribe(
        ( posts ) => {
          this.posts = posts;
        }
    );

    this.subscribers.currentUserSubscribtion = this.authService.currentUser$.subscribe(
        ( user )=>{
          this.user = user;
        }
    );
  }

  cropped(bounds:Bounds) {
    this.croppedHeight =bounds.bottom-bounds.top;
    this.croppedWidth = bounds.right-bounds.left;
  }

  remove(id){
    let removablePost = _.find(this.posts, function(post) {
      return post.id === id;
    });

    this.subscribers.feedRemoveSubscription =  this.feedService.removeFeedPost(id).subscribe(
        () => {
          this.posts = _.without(this.posts, removablePost);
          this.alertService.success('Post ' +id+ ' successfully removed');
        },
        (error) => {
          this.alertService.success(error.data.error.message);
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
