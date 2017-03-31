import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PostComponent } from './post.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostViewComponent } from './post-view/post-view.component';
import { PostEditComponent } from './post-edit/post-edit.component';

import { PostCreateResolverService } from '../../../core/resolvers/post.create.resolver.service';
import { PostViewResolverService } from '../../../core/resolvers/post.view.resolver.service';
import { PostEditResolverService } from '../../../core/resolvers/post.edit.resolver.service';

import { AuthGuard } from '../../../auth.guard.service';


export const routs = [
    {
        path: '',
        component: PostComponent,
        canActivate: [AuthGuard],
        children: [

            {
                path: ':id',
                component: PostComponent,
                canActivate: [AuthGuard],
                children: [
                    {
                        path: 'edit',
                        component: PostEditComponent,
                        resolve: {
                            edit:PostEditResolverService
                        },
                    },
                    {
                        path: '',
                        component: PostViewComponent,
                        resolve: {
                            view:PostViewResolverService
                        },
                    },
                ]
            },

            {
                path: '',
                component: PostCreateComponent,
                canActivate: [AuthGuard],
                resolve: {
                    create:PostCreateResolverService
                }
            },

        ]
    },

];

export const routing: ModuleWithProviders = RouterModule.forChild(routs);