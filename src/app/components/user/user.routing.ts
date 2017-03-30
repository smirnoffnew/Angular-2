import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { AuthGuard } from '../../auth.guard.service';


export const routs = [
    {
        path: '',
        component: UserComponent,
        resolve: {},
        canActivate: [AuthGuard]
    },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routs);