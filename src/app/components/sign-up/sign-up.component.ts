import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    model: any = {};
    isClickedRegister: boolean = false;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
    }

    register(signUpForm) {
        this.isClickedRegister = true;
        let dataForCreateUser = {
            email: this.model.email,
            username: this.model.username,
            password: this.model.password
        };
        this.authService.Registration(dataForCreateUser);
        this.model.password = '';
        signUpForm._submitted = false;
    }
}