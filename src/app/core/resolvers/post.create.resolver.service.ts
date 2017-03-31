import {Injectable} from '@angular/core';
import {Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';

import {AlertService} from '../services/alert.service';
import {FeedService} from '../services/feed.service';

@Injectable()
export class PostCreateResolverService implements Resolve<any> {

    private selfFeedIdObject: any = {};

    constructor(private router: Router,
                private feedService: FeedService,
                private alertService: AlertService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        //for ability to edit posts only from your feed
        this.feedService.getSelfFeedIdObject()
            .subscribe(
                (feedIdObject) => {
                    this.selfFeedIdObject = feedIdObject;
                    if (route.parent.parent.parent.params['id'] !== this.selfFeedIdObject.id) {
                        this.router.navigate(['feed/' + this.selfFeedIdObject.id + '/post']);
                    }
                },
                (error) => {
                    this.router.navigate(['feed']);
                    this.alertService.error(error.data.error.message);
                }
            );

    }
}
