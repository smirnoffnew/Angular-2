import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  model: any = {};

  constructor(
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService) { }

    register() {
      let user = {
        email:this.model.email,
        username:this.model.username,
        password: this.model.password
      };
      this.userService.create(user);
      if ( this.authenticationService.login(this.model.email,this.model.password) ) {
        this.router.navigate(['/feed']);
      };

      this.model.email = ' ';
      this.model.username = ' ';
      this.model.password = ' ';
    }
}