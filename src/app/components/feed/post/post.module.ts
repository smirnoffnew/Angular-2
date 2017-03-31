import { NgModule } from '@angular/core';
import { AppSharedModule } from '../../../shared/shared.module';
import { routing } from './post.routing';

import { PostComponent } from './post.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostViewComponent } from './post-view/post-view.component';
import { PostEditComponent } from './post-edit/post-edit.component';

@NgModule({
    declarations: [
        PostComponent,
        PostCreateComponent,
        PostViewComponent,
        PostEditComponent
    ],
    imports: [
        AppSharedModule,
        routing
    ],
    providers: []
})
export class PostModule {}