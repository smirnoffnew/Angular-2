import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfilesListComponent } from './profiles-list/profiles-list.component';
import { ProfileCreateComponent } from './profile-create/profile-create.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

import { ViewProfileResolverService } from '../../core/resolvers/profile.view.resolver.service';
import { ProfilesListResolverService } from '../../core/resolvers/profiles.list.resolver.service';
import { EditProfileResolverService } from '../../core/resolvers/profile.edit.resolver.service';
import { CreateProfileResolverService } from '../../core/resolvers/profile.create.resolver.service';

import { AuthGuard } from '../../auth.guard.service';

export const routs = [
    {
        path: '',
        component: ProfileComponent,
        resolve: {},
        canActivate: [AuthGuard],
        children: [
            {
                path: ':username',
                component: ProfileComponent,
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
];

export const routing: ModuleWithProviders = RouterModule.forChild(routs);