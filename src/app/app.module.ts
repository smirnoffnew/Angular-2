import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { routes } from './all-routs';
import 'hammerjs';

import { AppComponent } from './app.component';
import { SignInComponent, SignUpComponent, SignOutComponent, FeedComponent, ProfileComponent} from './components.barrel';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserComponent } from './user/user.component';

import { TokenService } from './services/token.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth.guard';
import { AlertService } from './services/alert.service';
import { Ng2UiAuthModule, CustomConfig} from 'ng2-ui-auth';
import { RestangularModule } from 'ng2-restangular';
import { AlertComponent } from './alert/alert.component';
import { ProfileService } from './services/profile.service';
import { AuthService } from './services/auth.service';


//resolvers
import { ProfileResolverService } from './resolvers/profile.resolver.service';
import { FeedResolverService } from './resolvers/feed.resolver.service';

export const GOOGLE_CLIENT_ID = '945919728141-s8e4e961ie6jgi5hbuuvedv7vo1u40n5.apps.googleusercontent.com';
export const FACEBOOK_CLIENT_ID = '656768837864102';
export class MyAuthConfig extends CustomConfig {
  defaultHeaders = {'Content-Type': 'application/json'};
  providers = {
    google: {clientId: GOOGLE_CLIENT_ID, url: '/clients/auth-google'},
    facebook: {clientId: FACEBOOK_CLIENT_ID, url: '/clients/auth-facebook'}
  };
  baseUrl = 'http://2muchcoffee.com:53000/api/';
}

@NgModule({
  imports: [
    MaterialModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    Ng2UiAuthModule.forRoot(MyAuthConfig),
    RestangularModule.forRoot((RestangularProvider) => {
      RestangularProvider.setBaseUrl('http://2muchcoffee.com:53000/api');
      //RestangularProvider.addErrorInterceptor( (response, subject, responseHandler) => {
      //  if (response.status) {
      //    var errorMsg = response.statusText;
      //    if(response.data.error.message) {
      //      console.log('err', response.data.error.message);
      //    }
      //    return false; // error handled
      //  }
      //  return true; // error not handled
      //});
      RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params)=> {
        let tokenService = new TokenService;
        return {
          params: Object.assign({}, params, {access_token: tokenService.get()}),
          headers: headers,
          element: element
        }
      });

    }),
  ],
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    FeedComponent,
    NotFoundComponent,
    UserComponent,
    SignOutComponent,
    AlertComponent,
    ProfileComponent,
  ],
  providers: [ 
    AuthGuard, 
    UserService, 
    TokenService, 
    AlertService, 
    ProfileService,
    ProfileResolverService,
    FeedResolverService,
    AuthService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
