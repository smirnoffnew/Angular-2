import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  model: any = {};

  //
  //constructor(
  //  private route: ActivatedRoute,
  //  private router: Router,
  //  private authenticationService: AuthenticationService,
  //  private alertService: AlertService) { }
  //
  ngOnInit() {
    //// reset login status
    //this.authenticationService.logout();
    //
    //// get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  //
  //login() {
  //  this.loading = true;
  //  this.authenticationService.login(this.model.username, this.model.password)
  //  .subscribe(
  //    data => {
  //      this.router.navigate([this.returnUrl]);
  //    },
  //    error => {
  //      this.alertService.error(error);
  //      this.loading = false;
  //    });
  //}

}
