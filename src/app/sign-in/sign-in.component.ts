import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  model: any = {};

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private userService: UserService) { }
  
  ngOnInit() {}
  
  signIn() {
    this.userService.authenticateUser(this.model.email, this.model.password).subscribe(
      (data:any) => {
        this.tokenService.set(data.id);
        this.router.navigate(['/feed']);
        console.log('SignInComponent currentTokenLogin$', data);
      },
      (error) => {
        console.log('SignInComponent currentTokenLogin$', error.data.error.message);
        this.model.email = '';
        this.model.password = '';
      }
    );
  }

}
