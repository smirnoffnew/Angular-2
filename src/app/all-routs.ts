import {
  SignInComponent,
  SignUpComponent,
  FeedComponent,
  NotFoundComponent,
  UserComponent
} from './components.barrel';

import { AuthGuard } from './services/auth.guard';

export const routes = [
  { path: '',  component: FeedComponent, canActivate: [AuthGuard] },
  
  { path:'sign-in',   name: 'SignIn',    component: SignInComponent },
  { path:'sign-up',   name: 'SignUp',    component: SignUpComponent },
  { path:'user',      name: 'User',      component: UserComponent,  canActivate: [AuthGuard]},
  { path: '404',      name: 'NotFound',  component: NotFoundComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];
