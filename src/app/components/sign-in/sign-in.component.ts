import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

    private model: any = {};
    private isClickedLogin = false;

    constructor( private authService: AuthService ) {
    }

    ngOnInit() {
    }

    signIn(signInForm) {
        this.isClickedLogin = true;
        this.authService.Logging(this.model.email, this.model.password);
        this.model.password = '';
        signInForm._submitted = false;
    }

    socialNetworkIn(socialNetwork) {
        this.authService.SocialNetworkAuth(socialNetwork);
    }
}
