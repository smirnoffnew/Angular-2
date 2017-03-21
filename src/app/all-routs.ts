import {
  SignInComponent,
  SignUpComponent,
  FeedComponent,
  NotFoundComponent,
  UserComponent,
  ProfileComponent,
  ProfilesListComponent,
  ProfileEditComponent,
  ProfileViewComponent,
  ProfileMainParentComponent,
  ProfileCreateComponent
} from './components.barrel';

import { AuthGuard } from './services/auth.guard';
import { FeedResolverService } from './resolvers/feed.resolver.service';
import { ViewProfileResolverService } from './resolvers/view.profile.resolver.service';
import { ProfilesListResolverService } from './resolvers/profiles-list.service';
import { EditProfileResolverService } from './resolvers/edit.profile.resolver.service';
import { CreateProfileResolverService } from './resolvers/create.profile.resolver.service';

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
    path: 'profile',
    name: 'Profile',
    component: ProfileMainParentComponent,
    canActivate: [AuthGuard],
    children: [ 
      {
        path: ':username',
        component: ProfileComponent,
        resolve: {
          profile: ViewProfileResolverService
        },
  
        children: [
          {
            path: 'edit',
            component: ProfileEditComponent,
            resolve: {
              profile: EditProfileResolverService
            },
          },
          {
            path: 'create',
            component: ProfileCreateComponent,
            resolve: {
              profile: CreateProfileResolverService
            },
          },
          {
            path: '',
            component: ProfileViewComponent,
            resolve: {
              profile: ViewProfileResolverService
            },
          },
        ]
      },
      {
        path: '',
        name: 'ProfileList',
        component: ProfilesListComponent,
        canActivate: [AuthGuard],
        resolve: {
          profile: ProfilesListResolverService
        }
      },
    ]
  },

  { path: '',             name: 'Feed',      component: FeedComponent,     canActivate: [AuthGuard], pathMatch: 'full'  },
  { path: 'sign-in',      name: 'SignIn',    component: SignInComponent,   canActivate: [AuthGuard] },
  { path: 'sign-up',      name: 'SignUp',    component: SignUpComponent,   canActivate: [AuthGuard] },
  { path: 'user',         name: 'User',      component: UserComponent,     canActivate: [AuthGuard] },
  { path: '404',          name: 'NotFound',  component: NotFoundComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '404' },
];
