import {
  SignInComponent,
  SignUpComponent,
  SignOutComponent,
  FeedComponent,
  NotFoundComponent,
  UserComponent
} from './components.barrel';

import { AuthGuard } from './services/auth.guard';

export const routes = [
  { path: 'feed',      name: 'Feed',      component: FeedComponent,     canActivate: [AuthGuard] },
  { path: '',         name: 'Feed',      component: FeedComponent,     canActivate: [AuthGuard] },
  { path: 'sign-in',   name: 'SignIn',    component: SignInComponent,   canActivate: [AuthGuard] },
  { path: 'sign-up',   name: 'SignUp',    component: SignUpComponent,   canActivate: [AuthGuard] },
  { path: 'sign-out',  name: 'SignOut',   component: SignOutComponent,  canActivate: [AuthGuard] },
  { path: 'user',      name: 'User',      component: UserComponent,     canActivate: [AuthGuard] },
  { path: '404',       name: 'NotFound',  component: NotFoundComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '404' },
];
