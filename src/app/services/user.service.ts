import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Restangular } from 'ng2-restangular';
import 'rxjs/Rx';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class UserService {
  private users:User[];
  
  constructor( public restangular: Restangular ) {
    this.users = [
      { email:'smirnoff', password:'asdfasdf', username:'smirnoff'},
      { email:'igor', password:'asdfasdf',  username:'igor' }
    ];
  }
  
  getAll() {
    return this.users;
  }
  
  create(user:any) {

    this.users[ this.users.length] = user;
    console.log('this.users', this.users);

    let userObject = {
      username: user.username,
      password: user.password,
      email: user.email
    };
    this.restangular.all('/clients').post(userObject).subscribe(res => {
      console.log(res);
    });
  }
  
  check(email:string, password:string) {
    
    for (var i = 0, len = this.users.length; i < len; i++) {
      console.log('email',email);
      console.log('password', password);
      console.log('this.users[i].email', this.users[i].email);
      console.log('this.users[i].password', this.users[i].password);
      console.log(this.users[i].email == email && this.users[i].password == password);
      if (this.users[i].email == email && this.users[i].password == password)
        return true;
    }
  }
  
  getById(id: number) {}
  update(user: User) {}
  delete(id: number) {}
  
}