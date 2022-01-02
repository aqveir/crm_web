import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Plugin Modules
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';

//Application Libraries
import { IntlTelInputModule, LoggerModule, NotificationModule, PipeModule, TranslateModule, ValidatorModule } from 'ellaisys-lib';

// Application Modules
import { NgSelectModule } from '@ng-select/ng-select';
import { LayoutModule } from '../_layout/layout.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { SupportRoutingModule } from './support-routing.module';

// Application Components
import { SupportListComponent } from './support-list/support-list.component';
import { SupportDetailComponent } from './support-detail/support-detail.component';


@NgModule({
  declarations: [
    SupportListComponent, 
    SupportDetailComponent
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
    SupportRoutingModule
  ]
})
export class SupportModule { }
