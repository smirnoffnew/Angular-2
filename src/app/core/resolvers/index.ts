import { ProfilesListResolverService } from './profiles.list.resolver.service';
import { CreateProfileResolverService } from './profile.create.resolver.service';
import { ViewProfileResolverService } from './profile.view.resolver.service';
import { EditProfileResolverService } from './profile.edit.resolver.service';

import { FeedResolverService } from './feed.resolver.service';

import { PostViewResolverService } from './post.view.resolver.service';
import { PostCreateResolverService } from './post.create.resolver.service';
import { PostEditResolverService } from './post.edit.resolver.service';

export const APP_RESOLVERS_PROVIDERS = [
    ProfilesListResolverService,
    CreateProfileResolverService,
    ViewProfileResolverService,
    EditProfileResolverService,
    FeedResolverService,

    PostViewResolverService,
    PostCreateResolverService,
    PostEditResolverService
];