import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import { Router  } from '@angular/router';
import {AuthService} from 'ng2-ui-auth';
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
        console.log('SignInComponent currentTokenLogin$', data);
      },
      (error) => {
        this.alertService.error(error.data.error.message);
        console.log('SignInComponent currentTokenLogin$', error.data.error.message);
        console.log('signInForm', signInForm);
        signInForm._submitted = false;
        this.model.password = '';
        console.log('this.signInForm', this.signInForm);
      }
    );
  }

  authenticateGoogle(){
    console.log('authenticateGoogle');
    this.auth.authenticate('google')
    .subscribe({
      error: (err: any) => {console.log(err);},
      complete: () => {this.router.navigateByUrl('feed');}
    });
  }

  authenticateFaceBook() {
    console.log('authenticateFaceBook');
  }

}
