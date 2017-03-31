import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve} from '@angular/router';

import {AlertService} from '../services/alert.service';
import {PostService} from '../services/post.service';


@Injectable()
export class PostViewResolverService implements Resolve<any> {

    constructor(private alertService: AlertService,
                private postService: PostService,
                private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let postId = route.params['id'];
        let feedId = route.parent.parent.parent.parent.params['id'];
        if (postId === undefined) {
            this.router.navigate(['/feed']);
        } else {
            this.postService.getSingleFeedPost(feedId, postId)
                .subscribe(
                    (response) => {
                        this.postService.getSingleFeedPost$.next(response);
                    },
                    (error) => {
                        this.alertService.error(error.data.error.message);
                        this.router.navigate(['/feed']);
                    }
                )
        }
    }
}
