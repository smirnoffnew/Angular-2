import { UserComponent } from './user.component';
import { AuthGuard } from '../../auth.guard.service';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

export const routs = [
    {
        path: '',
        component: UserComponent,
        resolve: {},
        canActivate: [AuthGuard]
    },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routs);