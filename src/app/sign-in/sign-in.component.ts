import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  model: any = {};
  userObject: any = {};
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService) { }
  
  ngOnInit() {
    this.authenticationService.logout();
  }
  
  signIn() {
    this.userObject = this.userService.checkUser(this.model.email, this.model.password);
    console.log('this.userObject ', this.userObject );
    if ( this.userObject.status ) {
      this.authenticationService.login(this.userObject.token);
      this.router.navigate(['/feed']);
    }
    this.model.email = '';
    this.model.password = '';
  }

}
