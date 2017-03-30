import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { FeedService } from './feed.service';
import { LogOutService } from './logout.service';
import { ProfileService } from './profile.service';
import { TokenService } from './token.service';
import { UserService } from './user.service';


export const APP_SERVICE_PROVIDERS = [
    AuthService,
    AlertService,
    FeedService,
    LogOutService,
    ProfileService,
    TokenService,
    UserService
];