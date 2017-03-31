import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../../../../core/services/alert.service';
import { PostService } from '../../../../core/services/post.service';

@Component({
  selector: 'app-post-view',
  templateUrl: 'post-view.component.html',
  styleUrls: ['post-view.component.css']
})
export class PostViewComponent implements OnInit {

  private subscribers: any = {};
  private post:any = {};

  constructor( private alertService:AlertService,
               private postService:PostService,
               private router:Router) {}

  ngOnInit() {
    this.subscribers.singleFeedPostSubscription = this.postService.getSingleFeedPost$.subscribe(
        (post) => {
          this.post = post;
        }
    );
  }

  remove () {
    this.post.remove()
        .subscribe(
        (post)=>{
          this.router.navigate(['/feed']);
          this.alertService.success('Post ' +post.id+ ' successfully removed');
        },
        (error) => {
          this.alertService.error(error.data.error.message);
        }
    )
  }

  ngOnDestroy() {
    for (let property in this.subscribers) {
      if ((typeof this.subscribers[property] !== 'undefined') && (this.subscribers[property] !== null)) {
        this.subscribers[property].unsubscribe();
      }
    }
  }

}
