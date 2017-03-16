import {
  SignInComponent,
  SignUpComponent,
  FeedComponent,
  NotFoundComponent,
  UserComponent,
  ProfileComponent,
  ProfilesListComponent
} from './components.barrel';

import { AuthGuard } from './services/auth.guard';
import { FeedResolverService } from './resolvers/feed.resolver.service';
import { ProfileResolverService } from './resolvers/profile.resolver.service';
import { ProfilesListResolverService } from './resolvers/profiles-list.service';

export const routes = [
  {
    path: 'feed',
    name: 'Feed',
    component: FeedComponent,
    canActivate: [AuthGuard],
    resolve: {
      feed: FeedResolverService
    }
  },

  {
    path: 'profile/:username',
    name: 'Profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: {
      profile: ProfileResolverService
    }
  },
    
  {
    path: 'profiles-list',
    name: 'ProfileList',
    component: ProfilesListComponent,
    canActivate: [AuthGuard],
    resolve: {
      profile: ProfilesListResolverService
    }
  },
  

  { path: '',             name: 'Feed',      component: FeedComponent,     canActivate: [AuthGuard] },
  { path: 'sign-in',      name: 'SignIn',    component: SignInComponent,   canActivate: [AuthGuard] },
  { path: 'sign-up',      name: 'SignUp',    component: SignUpComponent,   canActivate: [AuthGuard] },
  { path: 'user',         name: 'User',      component: UserComponent,     canActivate: [AuthGuard] },
  { path: '404',          name: 'NotFound',  component: NotFoundComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '404' },
];
