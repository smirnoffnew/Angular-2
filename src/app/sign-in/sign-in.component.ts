import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  model: any = {};
  constructor( private authenticationService: AuthenticationService, private router: Router) { }
  
  ngOnInit() {
    //// reset login status
    //this.authenticationService.logout();
    //
    //// get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  login() {
    console.log('email', this.model.email);
    console.log('password', this.model.password);

    if ( this.authenticationService.login(this.model.email, this.model.password) ) {
      this.router.navigate(['/feed']);
    }

    this.model.email = '';
    this.model.password = '';

  }

}
