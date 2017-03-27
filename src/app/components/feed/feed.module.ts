import { NgModule } from '@angular/core';
import { FeedComponent } from './feed.component';
import { AppSharedModule } from '../../shared/shared.module';
import { routing } from './feed.routing';

@NgModule({
    declarations: [ FeedComponent ],
    imports: [
        AppSharedModule,
        routing
    ],
    providers: []
})
export class FeedModule {}