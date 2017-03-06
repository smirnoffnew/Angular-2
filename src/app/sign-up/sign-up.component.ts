import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  model: any = {};

  constructor(
    private router: Router,
    private userService: UserService) { }

    register() {
      //this.loading = true;
      //this.userService.create(this.model)
      //.subscribe(
      //  data => {
      //    this.router.navigate(['/login']);
      //  },
      //  error => {
      //    this.loading = false;
      //  });
    }
}