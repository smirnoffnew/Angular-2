import { NgModule } from '@angular/core';

// my modules
import { CoreModule } from './core/core.module';
import { AppSharedModule } from './shared/shared.module';
import { routing } from './routes';

//components
import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
    declarations: [
        AppComponent,
        AlertComponent,
    ],
    imports: [
        CoreModule,
        AppSharedModule,
        routing,
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
