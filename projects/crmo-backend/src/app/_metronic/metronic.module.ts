import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';

//Application Module
import { TranslateModule, NotificationModule, LoggerModule, ValidatorModule, PipeModule } from 'ellaisys-lib';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    InlineSVGModule,

    //EllaiSys Library
    TranslateModule,
    NotificationModule,
    ValidatorModule,
    PipeModule,
    LoggerModule,
  ],
  exports: [
  ]
})
export class MetronicModule { }
