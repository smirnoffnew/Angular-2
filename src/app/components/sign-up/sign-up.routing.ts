import { SignUpComponent } from './sign-up.component';
import { AuthGuard } from '../../auth.guard.service';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

export const routs = [
    {
        path: '',
        component: SignUpComponent,
        resolve: {},
        canActivate: [AuthGuard]
    },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routs);