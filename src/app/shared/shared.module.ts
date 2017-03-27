import { NgModule } from '@angular/core';
import { DatepickerModule } from 'angular2-material-datepicker';
import { APP_PIPES_PROVIDERS } from './pipes/index';
import { MaterialModule } from '@angular/material';

import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [ ...APP_PIPES_PROVIDERS  ],
    imports: [
        DatepickerModule,
        MaterialModule,

        CommonModule,
        RouterModule,
        FormsModule,
    ],
    exports: [
        ...APP_PIPES_PROVIDERS,
        DatepickerModule,
        MaterialModule,

        CommonModule,
        RouterModule,
        FormsModule
    ]


})
export class AppSharedModule { }




