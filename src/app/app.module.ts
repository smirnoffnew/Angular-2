import { NgModule } from '@angular/core';
import 'hammerjs'

import { AppSharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { routing } from './routes';

import { AlertComponent } from './components/alert/alert.component';
import { AppComponent } from './app.component';


@NgModule({
    declarations: [
        AlertComponent,
        AppComponent,
    ],
    imports: [
        AppSharedModule,
        CoreModule,
        routing,
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
