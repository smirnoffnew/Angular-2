import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../../../core/services/alert.service';
import { AuthService } from '../../../core/services/auth.service';
import { FeedService } from '../../../core/services/feed.service';
import { PostService } from '../../../core/services/post.service';

import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
import * as _ from 'lodash';


@Component({
    selector: 'app-feed-view',
    templateUrl: 'feed-view.component.html',
    styleUrls: ['feed-view.component.css']
})
export class FeedViewComponent implements OnInit {

    private cropperSettings: CropperSettings;
    private croppedWidth: number;
    private croppedHeight: number;

    private data: any = {};
    private subscribers: any = {};
    private posts: any = [];

    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

    constructor( private alertService:AlertService,
                 private authService:AuthService,
                 private feedService:FeedService,
                 private postService:PostService,
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
    }

    ngOnInit() {
        this.subscribers.feedPostsSubscribtion = this.feedService.getFeedPosts$.subscribe(
            (posts) => {
                this.posts = posts;
            }
        );
    }

    cropped(bounds: Bounds) {
        this.croppedHeight = bounds.bottom - bounds.top;
        this.croppedWidth = bounds.right - bounds.left;
    }

    remove(feedId, id){
        let removablePost = _.find(this.posts, function(post) {
            return post.id === id;
        });

        this.subscribers.feedRemoveSubscription =  this.postService.removeFeedPost(feedId, id).subscribe(
            () => {
                this.posts = _.without(this.posts, removablePost);
                this.alertService.success('Post ' +id+ ' successfully removed');
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
