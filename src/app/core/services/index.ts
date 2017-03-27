import { TokenService } from './token.service';
import { UserService } from './user.service';
import { ProfileService } from './profile.service';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';

export const APP_SERVICE_PROVIDERS = [
    TokenService,
    UserService,
    ProfileService,
    AuthService,
    AlertService
];