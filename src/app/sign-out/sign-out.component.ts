import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})

export class SignOutComponent implements OnInit {
  constructor( private tokenService: TokenService, private router: Router) { }
  ngOnInit() {
    this.tokenService.delete();
  }
}
