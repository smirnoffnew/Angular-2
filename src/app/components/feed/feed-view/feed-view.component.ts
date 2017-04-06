import {Component, OnInit} from '@angular/core';

import {AlertService} from '../../../core/services/alert.service';
import {FeedService} from '../../../core/services/feed.service';
import {PostService} from '../../../core/services/post.service';

import * as _ from 'lodash';


@Component({
    selector: 'app-feed-view',
    templateUrl: 'feed-view.component.html',
    styleUrls: ['feed-view.component.css']
})
export class FeedViewComponent implements OnInit {

    private data: any = {};
    private subscribers: any = {};
    private posts: any = [];

    constructor(private alertService: AlertService,
                private feedService: FeedService,
                private postService: PostService) {
    }


    ngOnInit() {
        this.subscribers.feedPostsSubscribtion = this.feedService.getFeedPosts$.subscribe(
            (posts) => {
                _.forEach(posts, (post) => {
                    post.isClickedEDIT = false;
                    post.isClickedDELETE = false;
                    this.posts.push(post)
                });
            }
        );
    }


    remove(post) {

        post.isClickedDELETE = true;

        this.subscribers.feedRemoveSubscription = this.postService.removeFeedPost(post.feedId, post.id).subscribe(
            () => {
                this.posts = _.without(this.posts, post);
                this.alertService.success(`Post ${post.title} successfully removed`);
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
