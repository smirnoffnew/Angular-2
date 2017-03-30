import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {TokenService} from '../../core/services/token.service';


@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

    model: any = {};

    constructor( private authService: AuthService,
                 private tokenService: TokenService) {
    }

    ngOnInit() {
    }

    signIn(signInForm) {
        this.authService.Logging(this.model.email, this.model.password);
        this.model.password = '';
        signInForm._submitted = false;
    }

    socialNetworkIn(socialNetwork) {
        this.authService.SocialNetworkAuth(socialNetwork);
    }
}
