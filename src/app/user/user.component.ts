import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service'
import { UserModel } from '../models/UserModel';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private user = {};
  constructor(private userService:UserService,
              private alertService:AlertService,
              private activatedRoute:ActivatedRoute,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser$
    .subscribe(
      (data) => {
        console.log('data', data);
        this.user = new UserModel(data);
      },
      (error) => {
        this.alertService.error(error.data.error.message);
      }
    );
  }

}
