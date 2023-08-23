import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Plugin Modules
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';

//Application Libraries
import { LoggerModule, NotificationModule, PipeModule, TranslateModule, ValidatorModule } from 'common-lib';

// Application Modules
import { LayoutModule } from './_layout/layout.module';
import { ConsoleRoutingModule } from './console-routing.module';
import { ContactModule } from './contact/contact.module';
import { LeadModule } from './lead/lead.module';
import { OpportunityModule } from './opportunity/opportunity.module';
import { SupportModule } from './support/support.module';
//import { AccountModule } from './account/account.module';
import { SettingModule } from './setting/setting.module';
import { WidgetsModule } from './widgets/widgets.module';

// Application Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';
import { EventListComponent } from './event-list/event-list.component';
import { WorkQueueComponent } from './work-queue/work-queue.component';

@NgModule({
  declarations: [
    //CRMO Components
    DashboardComponent,
    WorkQueueComponent,
    EventListComponent,
    TaskListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,

    //CRMO Console Module
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
    WidgetsModule,
    SettingModule,
    ContactModule,
    //AccountModule,
    LeadModule,
    OpportunityModule,
    SupportModule,
  ],
  exports: [
    //EllaiSys Library
    TranslateModule,
    NotificationModule,
    ValidatorModule,
    PipeModule,
    LoggerModule,

    //CRMO Modules
    LayoutModule,
    WidgetsModule,
  ]
})
export class ConsoleModule { }
