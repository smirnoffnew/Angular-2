import { Injectable } from '@angular/core';
import { Restangular } from 'ng2-restangular';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';
import { ReplaySubject, Observable } from 'rxjs/Rx';

@Injectable()
export class FeedService {
    public feedIdObject:any;
    constructor( private restangular:Restangular,
                 private authService:AuthService,
                 private alertService:AlertService) {


    }

    getFeedId():Observable<any> {
        return this.authService.currentUser$
            .switchMap( (user) => {
                if( this.feedIdObject ) {
                    return Observable.of( this.feedIdObject )
                } else {
                    return this.restangular.one('clients', user.id).one('feeds').get();
                }
            })
            .catch( (error) => {
                this.alertService.error(error.data.error.message);
            })
            .map( (feedIdObject) => {
                this.feedIdObject = feedIdObject;
                return feedIdObject;
            })
    };

    getFeedPost():Observable<any>{
        return this.getFeedId().switchMap( (feedIdObject) => {
            return this.restangular.one('feeds', feedIdObject.id).one('posts').get();
        });
    }


}