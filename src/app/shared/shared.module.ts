import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { DatepickerModule } from 'angular2-material-datepicker';
import { APP_PIPES_PROVIDERS } from './pipes/index';
import { MaterialModule } from '@angular/material';
import { ImageCropperComponent } from 'ng2-img-cropper';


@NgModule({
    declarations: [
        ...APP_PIPES_PROVIDERS,
        ImageCropperComponent
    ],
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
        FormsModule,

        ImageCropperComponent
    ]
})
export class AppSharedModule { }




