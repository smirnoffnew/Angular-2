import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { TokenModel } from '../models/TokenModel';
import { UserService } from '../services/user.service';
import { Router  } from '@angular/router';
import { AuthService } from 'ng2-ui-auth';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  model: any = {};
  signInForm:any;

  constructor(
    private alertService:AlertService,
    private tokenService: TokenService,
    private router: Router,
    private userService: UserService,
    private auth: AuthService) { }
  
  ngOnInit() {}
  
  signIn(signInForm) {
    this.userService.authenticateUser(this.model.email, this.model.password).subscribe(
      (data:any) => {
        this.tokenService.set(data.id);
        this.router.navigate(['/feed']);
      },
      (error) => {
        this.alertService.error(error.data.error.message);
        signInForm._submitted = false;
        this.model.password = '';
      }
    );
  }

  authenticateGoogle() {
    this.auth.authenticate('google')
    .subscribe(
      (data) => {
        let response = data.json();
        let token = new TokenModel(response.data);
        this.tokenService.set(token.id);
        this.router.navigate(['/feed']);
        this.alertService.success('Google Authorization successful', true);
      },
      (error) => {
        this.alertService.error(error.data.error.message);
      }
    );
  }


  authenticateFaceBook() {
    console.log('authenticateFaceBook');
    this.auth.authenticate('facebook')
    .subscribe(
      (data) => {
        let response = data.json();
        let token = new TokenModel(response.data);
        this.tokenService.set(token.id);
        this.router.navigate(['/feed']);
        this.alertService.success('Facebook Authorization successful', true);
      },
      (error) => {
        this.alertService.error(error.data.error.message);
      }
    );
  }

}
