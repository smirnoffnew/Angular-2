import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve} from '@angular/router';

import {FeedService} from '../services/feed.service';
import {AlertService} from '../services/alert.service';

@Injectable()
export class FeedResolverService implements Resolve<any> {

    constructor(private feedService: FeedService,
                private alertService: AlertService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (route.parent.params['id'] === undefined) {

            this.feedService.getFeedPosts()
                .subscribe(
                    (response) => {
                        this.feedService.getFeedPosts$.next(response);
                    },
                    (error) => {
                        this.alertService.error(error.data.error.message);
                    }
                );
        } else {

            this.feedService.getFeedPosts(route.parent.params['id'])
                .subscribe(
                    (response) => {
                        this.feedService.getFeedPosts$.next(response);
                    },
                    (error) => {
                        this.alertService.error(error.data.error.message);
                    }
                );
        }
    }
}
