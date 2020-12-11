import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InlineSVGModule } from 'ng-inline-svg';

//Plugin Modules
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Application Modules
import { LayoutModule } from './_layout/layout.module';
import { ConsoleRoutingModule } from './console-routing.module';
import { SettingModule } from './setting/setting.module';
import { LoggerModule, NotificationModule, PipeModule, TranslateModule, ValidatorModule } from 'ellaisys-lib';

// Application Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { EventListComponent } from './event-list/event-list.component';
import { WorkQueueComponent } from './work-queue/work-queue.component';


@NgModule({
  declarations: [
    //CRMO Components
    DashboardComponent,
    WorkQueueComponent,
    ContactListComponent,
    TaskListComponent,
    EventListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,

    //CRO Console Module
    InlineSVGModule,
    ConsoleRoutingModule,

    //Pluin Modules
    NgbTooltipModule,

    //EllaiSys Library
    TranslateModule,
    NotificationModule,
    ValidatorModule,
    PipeModule,
    LoggerModule,

    //CRMO Modules
    LayoutModule,
    SettingModule
  ]
})
export class ConsoleModule { }
