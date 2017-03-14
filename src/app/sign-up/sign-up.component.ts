import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  model: any = {};
  signUpForm :any = {};

  constructor(
    private alertService: AlertService,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService) { }

  ngOnInit() {

  }

    register(signUpForm) {
      let dataForCreateUser = {
        email:this.model.email,
        username:this.model.username,
        password: this.model.password
      };
  
      //this.signUpForm = signUpForm;
      //this.userService.createUser(dataForCreateUser).subscribe();
      //
      //this.userService.currentUser$
      //.subscribe(
      //  (data) => {
      //    console.log('currentUser$ data', data);
      //    this.alertService.success('Registration successful', true);
      //    this.userService.saveCurrentUser(data);
      //  },
      //  (error) => {
      //    this.signUpForm._submitted = false;
      //    this.model.password = '';
      //    this.alertService.error(error.data.error.message);
      //  }
      //);
      //
      //this.userService.currentToken$
      //.subscribe(
      //  (data:any) => {
      //    console.log('currentToken$ data', data);
      //    this.tokenService.set(data.id);
      //    this.router.navigate(['/feed']);
      //  },
      //  (error) => {
      //    this.signUpForm._submitted = false;
      //    this.model.password = '';
      //    this.alertService.error(error.data.error.message);
      //  }
      //);
    }
}