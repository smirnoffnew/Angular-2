import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  model: any = {};
  
  constructor(private authService:AuthService) {}

  ngOnInit() {}

  register(signUpForm) {
    let dataForCreateUser = {
      email: this.model.email,
      username: this.model.username,
      password: this.model.password
    };
    this.authService.Registration(dataForCreateUser);
  }
}