import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { FeedService } from '../../core/services/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  constructor(private userService:UserService, private feedService:FeedService) {


    this.feedService.getFeedPost().subscribe(
        ( feedPosts ) => {
          console.log('posts', feedPosts);
        }
    );

  }
  ngOnInit() {}
}
