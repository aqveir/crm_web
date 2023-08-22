import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Third Party Pluin Modules
import { InlineSVGModule } from 'ng-inline-svg';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

//Application Modules
import { LoggerModule, NotificationModule, PipeModule, TranslateModule, ValidatorModule } from 'common-lib';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { ModalNoteComponent } from './modal-note/modal-note.component';
import { ModalDocumentComponent } from './modal-document/modal-document.component';
import { WidgetSubheaderComponent } from './widget-subheader/widget-subheader.component';
import { ModalSendMailComponent } from './modal-send-mail/modal-send-mail.component';
import { ModalSendSmsComponent } from './modal-send-sms/modal-send-sms.component';
import { ModalConfirmCallComponent } from './modal-confirm-call/modal-confirm-call.component';
import { ModalConfirmDeleteComponent } from './modal-confirm-delete/modal-confirm-delete.component';
import { ModalTaskComponent } from './modal-task/modal-task.component';
import { ModalEventsComponent } from './modal-events/modal-events.component';
import { ModalFiltersComponent } from './modal-filters/modal-filters.component';
import { UppyAngularModule } from 'uppy-angular';
import { ModalAddPaymentmethodComponent } from './modal-add-paymentmethod/modal-add-paymentmethod.component';

import { WidgetAddressBlockComponent } from './widget-address-block/widget-address-block.component';


@NgModule({
  declarations: [
    //CRMO Widgets
    ModalNoteComponent, 
    ModalDocumentComponent, 
    WidgetSubheaderComponent,
    ModalSendMailComponent,
    ModalSendSmsComponent,
    ModalConfirmCallComponent,
    ModalConfirmDeleteComponent,
    ModalTaskComponent,
    ModalEventsComponent,
    ModalFiltersComponent,
    ModalAddPaymentmethodComponent,

    WidgetAddressBlockComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,

    //Third Party Pluin Modules
    InlineSVGModule,
    NgSelectModule,
    NgbModule,
    CKEditorModule,
    UppyAngularModule,

    //EllaiSys Library
    TranslateModule,
    NotificationModule,
    ValidatorModule,
    PipeModule,
    LoggerModule,

    //Routing Module
    WidgetsRoutingModule,    
  ],
  exports: [
    ModalNoteComponent, 
    ModalDocumentComponent,
    ModalSendMailComponent,
    ModalSendSmsComponent,
    ModalConfirmCallComponent,
    ModalConfirmDeleteComponent,
    ModalAddPaymentmethodComponent,

    WidgetSubheaderComponent,
    WidgetAddressBlockComponent
  ]
})
export class WidgetsModule { }
