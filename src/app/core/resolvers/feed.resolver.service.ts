import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { FeedService } from '../services/feed.service';
import { AlertService } from '../services/alert.service';

@Injectable()
export class FeedResolverService implements Resolve<any> {
  constructor(private router: Router,
              private feedService: FeedService,
              private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.feedService.getFeedPosts().subscribe(
        (response)=>{
          this.feedService.getFeedPosts$.next(response);
        },
        (error)=>{
          this.alertService.error(error.data.error.message);
        }
    );
  }

}
