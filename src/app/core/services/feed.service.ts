import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import {Observable, Subject} from 'rxjs/Rx';

import {AlertService} from './alert.service';
import {AuthService} from './auth.service';


@Injectable()
export class FeedService {

    public selfFeedIdObject: any = false;
    public selfFeedIdObject$: any = new Subject();
    public getFeedPosts$ = new Subject();

    constructor(private restangular: Restangular,
                private authService: AuthService,
                private alertService: AlertService) {

        this.selfFeedIdObject$ = this.authService.currentUser$.take(1)

            .switchMap((user: any) => {
                if (this.selfFeedIdObject) {
                    return Observable.of(this.selfFeedIdObject)
                } else {
                    return this.restangular.one('clients', user.id).one('feeds').get();
                }
            })

            .catch((error) => {
                this.alertService.error(error.data.error.message);
                return Observable.throw(error);
            })

            .map((feedIdObject) => {
                this.selfFeedIdObject = feedIdObject;
                return feedIdObject;
            });
    }

    getFeedPosts(feedId?): Observable<any> {
        return this.selfFeedIdObject$.switchMap(
            (feedIdObject) => {
                if (feedId) {
                    return this.restangular.one('feeds', feedId).one('posts').get();
                } else {
                    return this.restangular.one('feeds', feedIdObject.id).one('posts').get();
                }
            }
        );
    };

    getSelfFeedIdObject() {
        return this.selfFeedIdObject$ = this.authService.currentUser$.take(1)

            .switchMap((user: any) => {
                if (this.selfFeedIdObject) {
                    return Observable.of(this.selfFeedIdObject)
                } else {
                    return this.restangular.one('clients', user.id).one('feeds').get();
                }
            })

            .catch((error) => {
                this.alertService.error(error.data.error.message);
                return Observable.throw(error);
            })

            .map((feedIdObject) => {
                this.selfFeedIdObject = feedIdObject;
                return feedIdObject;
            });
    }
}