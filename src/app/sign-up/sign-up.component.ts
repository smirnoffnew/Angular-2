import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  model: any = {};
  userObject: any = {};

  constructor(
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {

  }

    register() {

      let dataForCreateUser = {
        email:this.model.email,
        username:this.model.username,
        password: this.model.password
      };

      this.userService.create(dataForCreateUser).subscribe();

      this.userService.currentUser$
        .subscribe(
          (data) => {
            console.log('currentUser$', data);
          },
          (error) => {
            console.log('error', error.data.error.message);
          }
      );

      this.userService.currentToken$
        .subscribe(
          (data) => {
            console.log('currentToken$', data);
            //this.authenticationService.login(this.userObject.token);
            //this.router.navigate(['/feed']);
          },
          (error) => {
            console.log('error', error.data.error.message);
          }
      );
      
      this.model.email = ' ';
      this.model.username = ' ';
      this.model.password = ' ';
    }
}