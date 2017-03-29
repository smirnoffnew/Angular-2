import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//components
import { FeedComponent } from './feed.component';
import { FeedCreateComponent } from './feed-create/feed-create.component';
import { FeedEditComponent } from './feed-edit/feed-edit.component';

//services
import { AuthGuard } from '../../auth.guard.service';
import { FeedEditPostResolverService } from "../../core/resolvers/feed.edit-post.resolver.service";
import { FeedResolverService } from "../../core/resolvers/feed.resolver.service";


export const routs = [
    {
        path: '',
        component: FeedComponent,
        resolve: {
            post:FeedResolverService
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'create-post',
        component: FeedCreateComponent,
        resolve: {},
        canActivate: [AuthGuard]
    },

    {
        path: 'edit-post/:postId',
        component: FeedEditComponent,
        resolve: {
            post:FeedEditPostResolverService
        },
        canActivate: [AuthGuard]
    },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routs);