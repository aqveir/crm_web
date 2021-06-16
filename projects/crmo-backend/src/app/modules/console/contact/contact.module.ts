import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Plugin Modules
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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

import { ContactNewComponent } from './contact-new/contact-new.component';
import { TabProfileNewContactComponent } from './contact-new/tab-profile-new-contact/tab-profile-new-contact.component';
import { TabSettingNewContactComponent } from './contact-new/tab-setting-new-contact/tab-setting-new-contact.component';
import { TabAddressNewContactComponent } from './contact-new/tab-address-new-contact/tab-address-new-contact.component';
import { TabSummaryComponent } from './contact-new/tab-summary/tab-summary.component';


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

    //Contact Add Components
    ContactNewComponent,
    TabProfileNewContactComponent,   
    TabSettingNewContactComponent,
    TabAddressNewContactComponent,
    TabSummaryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,

    //Pluin Modules
    NgSelectModule,
    NgbModule,
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
