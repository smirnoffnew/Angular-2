import { NotFoundComponent } from './not-found.component';
import { AuthGuard } from '../../auth.guard.service';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

export const routs = [
    {
        path: '',
        component: NotFoundComponent,
        resolve: {},
        canActivate: [AuthGuard]
    },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routs);