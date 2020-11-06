import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Application Module
import { TranslateModule, NotificationModule, LoggerModule, ValidatorModule, PipeModule } from 'ellaisys-lib';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,

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
