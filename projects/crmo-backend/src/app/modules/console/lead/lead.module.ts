import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Plugin Modules
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';

//Application Libraries
import { IntlTelInputModule, LoggerModule, NotificationModule, PipeModule, TranslateModule, ValidatorModule } from 'common-lib';

// Application Modules
import { NgSelectModule } from '@ng-select/ng-select';
import { LayoutModule } from '../_layout/layout.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { LeadRoutingModule } from './lead-routing.module';

// Application Components
import { LeadListComponent } from './lead-list/lead-list.component';
import { LeadDetailComponent } from './lead-detail/lead-detail.component';

@NgModule({
  declarations: [
    LeadListComponent, 
    LeadDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,

    //Imported Modules
    NgSelectModule,
    NgbTooltipModule,
    InlineSVGModule,

    //EllaiSys Library
    TranslateModule,
    NotificationModule,
    ValidatorModule,
    PipeModule,
    LoggerModule,
    IntlTelInputModule,

    //CRMO Modules
    LayoutModule,
    WidgetsModule,

    //Application Modules
    LeadRoutingModule
  ]
})
export class LeadModule { }
