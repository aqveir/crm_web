import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';

//Application Module
import { TranslateModule, NotificationModule, LoggerModule, ValidatorModule, PipeModule } from 'common-lib';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    InlineSVGModule,

    //Common Library
    TranslateModule,
    NotificationModule,
    ValidatorModule,
    PipeModule,
    LoggerModule,
  ],
  exports: [
    CommonModule,
  ]
})
export class MetronicModule { }
