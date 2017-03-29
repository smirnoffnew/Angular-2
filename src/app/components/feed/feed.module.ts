import { NgModule } from '@angular/core';
import { FeedComponent } from './feed.component';
import { FeedCreateComponent } from './feed-create/feed-create.component';
import { FeedEditComponent } from './feed-edit/feed-edit.component';
import { AppSharedModule } from '../../shared/shared.module';
import { routing } from './feed.routing';

@NgModule({
    declarations: [
        FeedComponent,
        FeedCreateComponent,
        FeedEditComponent
    ],
    imports: [
        AppSharedModule,
        routing
    ],
    providers: []
})
export class FeedModule {}