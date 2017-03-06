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
import { AuthGuard } from './services/auth.guard';
import { UserComponent } from './user/user.component';
import { UserService } from './services/user.service';

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
    UserComponent
  ],
  providers: [ AuthGuard, UserService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
