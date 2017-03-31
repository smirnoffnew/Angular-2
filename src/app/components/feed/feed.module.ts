import { NgModule } from '@angular/core';
import { AppSharedModule } from '../../shared/shared.module';
import { routing } from './feed.routing';

import { FeedComponent } from './feed.component';
import { FeedViewComponent } from "./feed-view/feed-view.component";


@NgModule({
    declarations: [
        FeedComponent,
        FeedViewComponent
    ],
    imports: [
        AppSharedModule,
        routing
    ],
    providers: []
})
export class FeedModule {}