import {Injectable} from '@angular/core';
import {Router, Resolve} from '@angular/router';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {FeedService} from '../services/feed.service';
import {PostService} from '../services/post.service';
import {AlertService} from '../services/alert.service';

@Injectable()
export class PostEditResolverService implements Resolve<any> {
    private user: any;

    constructor(private router: Router,
                private feedService: FeedService,
                private postService: PostService,
                private alertService: AlertService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let postId = route.parent.params['id'];
        let feedId = route.parent.parent.parent.parent.params['id'];

        this.postService.getSingleFeedPost(feedId, postId)
            .subscribe(
                (response) => {
                    this.postService.getSingleFeedPost$.next(response);
                    this.postService.singleFeedPostForEdit = false;
                },
                (error) => {
                    this.alertService.error(error.data.error.message);
                    this.router.navigate(['/feed']);
                }
            );

    }
}
