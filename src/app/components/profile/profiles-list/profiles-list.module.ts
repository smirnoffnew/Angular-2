import { NgModule } from '@angular/core';
import { ProfilesListComponent } from './profiles-list.component';
import { AppSharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [ ProfilesListComponent ],
    imports: [ AppSharedModule ],
    providers: [],
})
export class ProfilesListModule {}