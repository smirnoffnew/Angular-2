import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  model: any = {};

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService) { }

  ngOnInit() { }

    register() {

      let dataForCreateUser = {
        email:this.model.email,
        username:this.model.username,
        password: this.model.password
      };

      this.userService.createUser(dataForCreateUser).subscribe();

      this.userService.currentUser$
        .subscribe(
          (data) => {
            console.log('SignUpComponent currentUser$', data);
          },
          (error) => {
            console.log('SignUpComponent currentUser$', error.data.error.message);
          }
      );

      this.userService.currentToken$
        .subscribe(
          (data:any) => {
            this.tokenService.set(data.id);
            this.router.navigate(['/feed']);
            console.log('SignUpComponent currentToken$', data);
          },
          (error) => {
            console.log('SignUpComponent currentToken$', error.data.error.message);
          }
      );
    }
}