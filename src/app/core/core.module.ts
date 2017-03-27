import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from '@angular/http';

// auth guard
import {AuthGuard} from '../auth.guard.service';

//custom services
import {APP_SERVICE_PROVIDERS} from './services/index';
import {TokenService} from './services/token.service';

//resolvers
import {APP_RESOLVERS_PROVIDERS} from './resolvers/index';

//other services
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {RestangularModule} from 'ng2-restangular';
export function RestangularConfigFactory (RestangularProvider,tokenService) {
    RestangularProvider.setBaseUrl('http://kickstagram.2muchcoffee.com/api');
    RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params)=> {
        return {
            params: Object.assign({}, params, tokenService.isTokenExist() ? {access_token: tokenService.get()} : {}),
            headers: headers,
            element: element
        }
    });
}

import { Ng2UiAuthModule, CustomConfig } from 'ng2-ui-auth';
export const GOOGLE_CLIENT_ID = '945919728141-s8e4e961ie6jgi5hbuuvedv7vo1u40n5.apps.googleusercontent.com';
export const FACEBOOK_CLIENT_ID = '656768837864102';
export class MyAuthConfig extends CustomConfig {
    defaultHeaders = {'Content-Type': 'application/json'};
    providers = {
        google: {clientId: GOOGLE_CLIENT_ID, url: '/clients/auth-google'},
        facebook: {clientId: FACEBOOK_CLIENT_ID, url: '/clients/auth-facebook'}
    };
    baseUrl = 'http://kickstagram.2muchcoffee.com/api/';
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        HttpModule,
        RestangularModule.forRoot([TokenService], RestangularConfigFactory),
        Ng2UiAuthModule.forRoot(MyAuthConfig)
    ],
    declarations: [],
    providers: [
        ...APP_SERVICE_PROVIDERS,
        ...APP_RESOLVERS_PROVIDERS,

        CookieService,
        AuthGuard,
    ]
})
export class CoreModule {}