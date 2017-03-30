import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';
import { AppSharedModule } from '../../shared/shared.module';
import { routing } from './user.routing';


@NgModule({
    declarations: [ UserComponent ],
    imports: [
        AppSharedModule,
        routing
    ],
    providers: []
})

export class UserModule {}