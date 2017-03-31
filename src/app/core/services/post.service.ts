import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import {Observable, Subject} from 'rxjs/Rx';


@Injectable()
export class PostService {

    public getSingleFeedPost$ = new Subject();
    public singleFeedPostForEdit = false;

    constructor(private restangular: Restangular) {
    }

    getSingleFeedPost(feedId: any, id: any): Observable<any> {
        return this.restangular.one('feeds', feedId).one('posts', id).get();
    }

    saveFeedPost(postObject): Observable<any> {
        return this.restangular.one('feeds', postObject.feedId).all('posts').post(postObject);
    }

    removeFeedPost(feedId: any, id: any): Observable<any> {
        return this.restangular.one('feeds', feedId).one('posts', id).remove();
    }

}