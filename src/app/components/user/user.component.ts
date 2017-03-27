import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private asyncUser:any;
  constructor(private authService:AuthService) { }
  ngOnInit(): void {
    this.asyncUser = this.authService.currentUser$;
  }
}
