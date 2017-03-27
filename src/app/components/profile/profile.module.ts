import { NgModule } from '@angular/core';
import { AppSharedModule } from '../../shared/shared.module';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { routing } from './profile.routing';

import { ProfileComponent } from './profile.component';
import { ProfilesListComponent } from './profiles-list/profiles-list.component';
import { ProfileCreateComponent } from './profile-create/profile-create.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

@NgModule({
    declarations: [
        ImageCropperComponent,
        ProfileComponent,
        ProfilesListComponent,
        ProfileCreateComponent,
        ProfileViewComponent,
        ProfileEditComponent
    ],
    imports: [
        AppSharedModule,
        routing
    ],
    providers: []
})
export class ProfileModule {}