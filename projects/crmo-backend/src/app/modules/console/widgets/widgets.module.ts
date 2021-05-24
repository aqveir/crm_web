import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InlineSVGModule } from 'ng-inline-svg';

//Plugin Modules
import { NgbTooltipModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

//Application Modules
import { LoggerModule, NotificationModule, PipeModule, TranslateModule, ValidatorModule } from 'ellaisys-lib';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { ModalNoteComponent } from './modal-note/modal-note.component';
import { ModalDocumentComponent } from './modal-document/modal-document.component';
import { WidgetSubheaderComponent } from './widget-subheader/widget-subheader.component';
import { ModalSendMailComponent } from './modal-send-mail/modal-send-mail.component';
import { ModalSendSmsComponent } from './modal-send-sms/modal-send-sms.component';
import { ModalConfirmCallComponent } from './modal-confirm-call/modal-confirm-call.component';
import { ModalConfirmDeleteComponent } from './modal-confirm-delete/modal-confirm-delete.component';


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
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,

    //CRMO Console Module
    InlineSVGModule,
    WidgetsRoutingModule,

    //Pluin Modules
    NgbTooltipModule,
    NgbModalModule,
    CKEditorModule,

    //EllaiSys Library
    TranslateModule,
    NotificationModule,
    ValidatorModule,
    PipeModule,
    LoggerModule
  ],
  exports: [
    ModalNoteComponent, 
    ModalDocumentComponent, 
    WidgetSubheaderComponent,
    ModalSendMailComponent,
    ModalSendSmsComponent,
    ModalConfirmCallComponent,
    ModalConfirmDeleteComponent,
  ]
})
export class WidgetsModule { }
