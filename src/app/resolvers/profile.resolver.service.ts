import { Restangular } from 'ng2-restangular'
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProfileResolverService implements Resolve<any> {
  
  constructor(private restangular:Restangular) { }

  resolve() {
    console.log('ProfileResolverService ProfileResolverService');
    //GET /clients/{username}/get-profile
  //resolve(): Observable<any> {
  //  let newsUrl = 'http://httpbin.org/post';
  //  let news = 'The sky is blue'; //Mock data to be returned by test API
  //  return this.http.post(newsUrl, news)
  //  .map( (res) => res.json() )
  //  .catch( (err) => Observable.throw(error.json().error) );
  }
}