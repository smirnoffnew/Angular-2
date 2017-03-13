import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service'
import { UserModel } from '../models/UserModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private user = {};
  constructor(private userService:UserService,
              private alertService:AlertService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.getCurrentUser()
    .subscribe(
      (data) => {
        this.user = new UserModel(data);
        this.userService.saveCurrentUser(data);
      },
      (error) => {
        this.alertService.error(error.data.error.message);
      }
    );
  }

}
