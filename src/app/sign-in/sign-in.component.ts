import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { TokenModel } from '../models/TokenModel';
import { UserService } from '../services/user.service';
import { Router  } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  model: any = {};
  signInForm:any = {};

  constructor(
    private alertService:AlertService,
    private tokenService: TokenService,
    private router: Router,
    private userService: UserService,
    private authService:AuthService) { }
  
  ngOnInit() {}
  
  signIn(signInForm) {

    this.userService.authenticateUser(this.model.email, this.model.password).subscribe();
    this.userService.currentToken$
    .subscribe(
      (data:any) => {
        console.log('currentToken$ data', data);
        this.tokenService.set(data.id);
        this.router.navigate(['/feed']);
      },
      (error) => {
        this.signInForm._submitted = false;
        this.model.password = '';
        this.alertService.error(error.data.error.message);
      }
    );
  }

  authenticateGoogle() {

    //this.userService.authenticateGoogle()
    //.subscribe(
    //  (data) => {
    //    console.log('currentUser$ data', data);
    //    this.alertService.success('Google Authorization successful', true);
    //    this.userService.saveCurrentUser(data);
    //    this.tokenService.set(token.id);
    //    this.router.navigate(['/feed']);
    //
    //  },
    //  (error) => {
    //    this.alertService.error(error.data.error.message);
    //  }
    //);


    this.userService.authenticateGoogle().subscribe();

    //this.userService.currentUser$
    //.subscribe(
    //  (data) => {
    //    console.log('currentUser$ data', data);
    //    this.alertService.success('Authentication successful', true);
    //    this.userService.saveCurrentUser(data);
    //  },
    //  (error) => {
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
    //    this.alertService.error(error.data.error.message);
    //  }
    //);
  }


  authenticateFaceBook() {
    //console.log('authenticateFaceBook');
    //this.auth.authenticate('facebook')
    //.subscribe(
    //  (data) => {
    //    let response = data.json();
    //    let token = new TokenModel(response.data);
    //    this.tokenService.set(token.id);
    //    this.router.navigate(['/feed']);
    //    this.alertService.success('Facebook Authorization successful', true);
    //  },
    //  (error) => {
    //    this.alertService.error(error.data.error.message);
    //  }
    //);
  }

}
