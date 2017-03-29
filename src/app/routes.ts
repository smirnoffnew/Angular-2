import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './auth.guard.service';

const routes = [

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