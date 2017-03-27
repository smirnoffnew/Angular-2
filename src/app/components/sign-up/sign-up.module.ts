import { NgModule } from '@angular/core';
import { SignUpComponent } from './sign-up.component';
import { AppSharedModule } from '../../shared/shared.module';
import { routing } from './sign-up.routing';

@NgModule({
    declarations: [ SignUpComponent ],
    imports: [
        AppSharedModule,
        routing
    ],
    providers: []
})
export class SignUpModule {}

