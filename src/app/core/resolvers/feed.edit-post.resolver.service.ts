import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { FeedService } from '../services/feed.service';
import { AlertService } from '../services/alert.service';

@Injectable()
export class FeedEditPostResolverService implements Resolve<any> {
    private user:any;

    constructor(private router: Router,
                private feedService:FeedService,
                private alertService:AlertService)  {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (route.params['postId']===undefined) {
            this.router.navigate(['/feed']);
        } else {

            this.feedService.getSingleFeedPost( route.params['postId'] ).subscribe(
                (response)=>{
                    this.feedService.getSingleFeedPost$.next(response);

                },
                (error)=>{
                    this.alertService.error(error.data.error.message);
                }
            )

        }
    }
}
