import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { routes } from './all-routs';
import 'hammerjs';

import { AppComponent } from './app.component';
import { SignInComponent, SignUpComponent, FeedComponent } from './components.barrel';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserComponent } from './user/user.component';

import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth.guard';
import { SignOutComponent } from './sign-out/sign-out.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    FeedComponent,
    NotFoundComponent,
    UserComponent,
    SignOutComponent
  ],
  providers: [ AuthGuard, UserService, AuthenticationService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
