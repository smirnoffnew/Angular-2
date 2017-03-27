import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found.component';
import { AppSharedModule } from '../../shared/shared.module';
import { routing } from './not-found.routing';

@NgModule({
    declarations: [ NotFoundComponent ],
    imports: [
        AppSharedModule,
        routing
    ],
    providers: []
})
export class NotFoundModule {}