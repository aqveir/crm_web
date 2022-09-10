import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Application Module
import { TranslateModule, NotificationModule, LoggerModule, ValidatorModule, PipeModule } from 'ellaisys-lib';
import { ErrorRoutingModule } from './error-routing.module';

import { HttpErrorComponent } from './http-error/http-error.component';


@NgModule({
  declarations: [
    HttpErrorComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule,

    //EllaiSys Library
    TranslateModule,
    NotificationModule,
    ValidatorModule,
    PipeModule,
    LoggerModule,
  ]
})
export class ErrorModule { }
