import { ProfilesListResolverService } from './profiles.list.service';
import { CreateProfileResolverService } from './profile.create.resolver.service';
import { ViewProfileResolverService } from './profile.view.resolver.service';
import { EditProfileResolverService } from './profile.edit.resolver.service';
import { FeedResolverService } from './feed.resolver.service';

export const APP_RESOLVERS_PROVIDERS = [
    ProfilesListResolverService,
    CreateProfileResolverService,
    ViewProfileResolverService,
    EditProfileResolverService,
    FeedResolverService,
];