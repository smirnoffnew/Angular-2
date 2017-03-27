import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//authGuardService
import { AuthGuard } from './auth.guard.service';

//resolvers
import { FeedResolverService } from './core/resolvers/feed.resolver.service';
import { ViewProfileResolverService } from './core/resolvers/profile.view.resolver.service';
import { ProfilesListResolverService } from './core/resolvers/profiles.list.service';
import { EditProfileResolverService } from './core/resolvers/profile.edit.resolver.service';
import { CreateProfileResolverService } from './core/resolvers/profile.create.resolver.service';

//components
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserComponent } from './components/user/user.component';
import { FeedComponent } from './components/feed/feed.component';
// import { ProfileParentComponent } from './components/profile-parent/profile-parent.component';
// import { ProfileComponent } from './components/profile/profile.component';
// import { ProfilesListComponent } from './components/profile/profiles-list/profiles-list.component';
// import { ProfileCreateComponent } from './components/profile/profile-create/profile-create.component';
// import { ProfileViewComponent } from './components/profile/profile-view/profile-view.component';
// import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';

const routes = [
  // {
  //   path: '',
  //   component: AppComponent,
  //   children: [

  //
  //
  //

  //       //

  //       //

  //
  //       // {
  //       //   path: 'profile',
  //       //   loadChildren: './components/profile-parent/profile-parent.module#ProfileParentModule',
  //       //   canLoad: [AuthGuard],
  //       //   children: [
  //       //     {
  //       //       path: ':username',
  //       //       loadChildren: './components/profile-parent/profile/profile.module#ProfileModule',
  //       //       children: [
  //       //         {
  //       //           path: 'edit',
  //       //           loadChildren: './components/profile-parent/profile/profile-edit/profile-edit.module#ProfileEditModule',
  //       //           resolve: {
  //       //             profile: EditProfileResolverService
  //       //           },
  //       //         },
  //       //         {
  //       //           path: 'create',
  //       //           loadChildren: './components/profile-parent/profile/profile-create/profile-create.module#ProfileCreateModule',
  //       //           resolve: {
  //       //             profile: CreateProfileResolverService
  //       //           },
  //       //         },
  //       //         {
  //       //           path: '',
  //       //           loadChildren: './components/profile-parent/profile/profile-view/profile-view.module#ProfileViewModule',
  //       //           resolve: {
  //       //             profile: ViewProfileResolverService
  //       //           },
  //       //         },
  //       //       ]
  //       //     },
  //       //     {
  //       //       path: '',
  //       //       name: 'ProfileList',
  //       //       component: ProfilesListComponent,
  //       //       canLoad: [AuthGuard],
  //       //       resolve: {
  //       //         profile: ProfilesListResolverService
  //       //       }
  //       //     },
  //       //   ]
  //       // },
  //
  //   ]
  // },

  { path: 'sign-in',
    loadChildren: './components/sign-in/sign-in.module#SignInModule',
    canLoad: [AuthGuard]
  },

  { path: 'sign-up',
    loadChildren: './components/sign-up/sign-up.module#SignUpModule',
    canLoad: [AuthGuard]
  },

  { path: 'user',
    loadChildren: './components/user/user.module#UserModule',
    canLoad: [AuthGuard]
  },

  { path: 'feed',
    loadChildren: './components/feed/feed.module#FeedModule',
    canLoad: [AuthGuard],
    resolve: {
      feed: FeedResolverService
    }
  },

  {
    path: 'profile',
    loadChildren: './components/profile/profile.module#ProfileModule',
    canLoad: [AuthGuard],
  },

  { path: '404',
    loadChildren: './components/not-found/not-found.module#NotFoundModule',
    canLoad: [AuthGuard]
  },


  { path: '**', redirectTo: '404' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);