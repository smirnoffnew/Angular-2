import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';

//components
import {FeedComponent} from './feed.component';
import {FeedViewComponent} from "./feed-view/feed-view.component";

import {AuthGuard} from '../../auth.guard.service';
import {FeedResolverService} from "../../core/resolvers/feed.resolver.service";


export const routs = [
    {
        path: '',
        component: FeedComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: ':id',
                component: FeedComponent,
                canActivate: [AuthGuard],
                children: [
                    {
                        path: 'post',
                        loadChildren: './post/post.module#PostModule',
                        canLoad: [AuthGuard],
                    },
                    {
                        path: '',
                        component: FeedViewComponent,
                        resolve: {
                            post: FeedResolverService
                        },
                        canActivate: [AuthGuard],
                    },
                ]
            },
            {
                path: '',
                component: FeedViewComponent,
                resolve: {
                    post: FeedResolverService
                },
                canActivate: [AuthGuard],
            },

        ]
    }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routs);