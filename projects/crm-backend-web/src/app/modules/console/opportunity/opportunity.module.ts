import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Plugin Modules
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';

//Application Libraries
import { IntlTelInputModule, LoggerModule, NotificationModule, PipeModule, TranslateModule, ValidatorModule } from 'common-lib';

// Application Modules
import { NgSelectModule } from '@ng-select/ng-select';
import { LayoutModule } from '../_layout/layout.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { OpportunityRoutingModule } from './opportunity-routing.module';

// Application Components
import { OpportunityListComponent } from './opportunity-list/opportunity-list.component';
import { OpportunityDetailComponent } from './opportunity-detail/opportunity-detail.component';


@NgModule({
  declarations: [
    OpportunityListComponent, 
    OpportunityDetailComponent
  ],
  imports: [
    ReactiveFormsModule,

    //Imported Modules
    NgSelectModule,
    NgbTooltipModule,
    InlineSVGModule,

    //Common Library
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
    OpportunityRoutingModule
  ]
})
export class OpportunityModule { }
