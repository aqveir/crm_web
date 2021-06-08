import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Plugin Modules
import { NgbTooltipModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { UppyAngularModule } from 'uppy-angular';

//Application Modules
import { ContactRoutingModule } from './contact-routing.module';
import { LayoutModule } from '../_layout/layout.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { LoggerModule, NotificationModule, PipeModule, TranslateModule, ValidatorModule, IntlTelInputModule } from 'ellaisys-lib';

//Application Components
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { TabNoteComponent } from './contact-detail/tab-note/tab-note.component';
import { TabDocumentComponent } from './contact-detail/tab-document/tab-document.component';
import { TabAddressComponent } from './contact-detail/tab-address/tab-address.component';
import { TabSettingComponent } from './contact-detail/tab-setting/tab-setting.component';
import { TabProfileComponent } from './contact-detail/tab-profile/tab-profile.component';
import { TabAccessControlComponent } from './contact-detail/tab-access-control/tab-access-control.component';


@NgModule({
  declarations: [
    //CRMO Components
    ContactListComponent,
    ContactDetailComponent,
    TabNoteComponent,
    TabDocumentComponent,
    TabAddressComponent,
    TabSettingComponent,
    TabProfileComponent,
    TabAccessControlComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,

    //Pluin Modules
    NgbTooltipModule,
    NgbModalModule,
    UppyAngularModule,

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
    ContactRoutingModule,
  ]
})
export class ContactModule { }
