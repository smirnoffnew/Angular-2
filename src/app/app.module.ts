import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { DatepickerModule } from 'angular2-material-datepicker'
import { RouterModule, ActivatedRouteSnapshot} from '@angular/router';
import { routes } from './all-routs';
import 'hammerjs';
import { AppComponent } from './app.component';
import { SignInComponent,
         SignUpComponent,
         FeedComponent,
         ProfileComponent,
         ProfilesListComponent,
         ProfileEditComponent,
         ProfileViewComponent,
         ProfileMainParentComponent,
         ProfileCreateComponent} from './components.barrel';
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
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { KeyAndValueOfObject } from './pipes/keyAndValueOfObject';
import { ObjectToArrayPipe } from './pipes/objectToArrayPipe';

//resolvers
import { ProfilesListResolverService } from './resolvers/profiles-list.service';
import { CreateProfileResolverService } from './resolvers/create.profile.resolver.service';
import { ViewProfileResolverService } from './resolvers/view.profile.resolver.service';
import { EditProfileResolverService } from './resolvers/edit.profile.resolver.service';
import { FeedResolverService } from './resolvers/feed.resolver.service';
import { CookieService } from 'angular2-cookie/core';

import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';

export function RestangularConfigFactory (RestangularProvider,tokenService) {
  RestangularProvider.setBaseUrl('http://2muchcoffee.com:53000/api');
  RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params)=> {
    return {
      params: Object.assign({}, params, tokenService.isTokenExist() ? {access_token: tokenService.get()} : {}),
      headers: headers,
      element: element
    }
  });
}
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
    DatepickerModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    Ng2UiAuthModule.forRoot(MyAuthConfig),
    RestangularModule.forRoot([TokenService],RestangularConfigFactory),
  ],
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    FeedComponent,
    NotFoundComponent,
    UserComponent,
    AlertComponent,
    ProfileComponent,
    ObjectToArrayPipe,
    KeyAndValueOfObject,
    ProfilesListComponent,
    ProfileEditComponent,
    ProfileViewComponent,
    ProfileMainParentComponent,
    ProfileCreateComponent,
    ImageCropperComponent
  ],
  providers: [
    AuthService,
    AuthGuard, 
    UserService, 
    TokenService, 
    AlertService, 
    ProfileService,
    Cookie,
    CookieService,
 
  
    ViewProfileResolverService,
    EditProfileResolverService,
    CreateProfileResolverService,
    ProfilesListResolverService,
    FeedResolverService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
