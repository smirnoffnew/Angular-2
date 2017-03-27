import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in.component';
import { AppSharedModule } from '../../shared/shared.module';
import { routing } from './sign-in.routing';

@NgModule({
    declarations: [ SignInComponent ],
    imports: [
        AppSharedModule,
        routing],
    providers: []
})
export class SignInModule {}