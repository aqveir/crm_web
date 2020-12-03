import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InlineSVGModule } from 'ng-inline-svg';
import { ConsoleRoutingModule } from './console-routing.module';
import { LayoutModule } from './_layout/layout.module';
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

    //CRMO Modules
    LayoutModule
  ]
})
export class ConsoleModule { }
