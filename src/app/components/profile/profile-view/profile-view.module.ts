import { NgModule } from '@angular/core';
import { ProfileViewComponent } from './profile-view.component';
import { AppSharedModule } from '../../../shared/shared.module';
import { KeyAndValueOfObject } from '../../../shared/pipes/keyAndValueOfObject.pipe';

@NgModule({
    declarations: [ ProfileViewComponent ],
    imports: [ AppSharedModule ],
    providers: []
})
export class ProfileViewModule {}