import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Plugin Modules
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

//Application Modules
import { ContactRoutingModule } from './contact-routing.module';
import { LoggerModule, NotificationModule, PipeModule, TranslateModule, ValidatorModule, IntlTelInputModule } from 'ellaisys-lib';

//Application Components
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';


@NgModule({
  declarations: [
    //CRMO Components
    ContactListComponent,
    ContactDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,

    //Pluin Modules
    NgbTooltipModule,

    //EllaiSys Library
    TranslateModule,
    NotificationModule,
    ValidatorModule,
    PipeModule,
    LoggerModule,
    IntlTelInputModule,

    //Application Modules
    ContactRoutingModule
  ]
})
export class ContactModule { }
