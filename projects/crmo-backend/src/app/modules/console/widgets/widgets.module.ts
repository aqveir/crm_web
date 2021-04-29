import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InlineSVGModule } from 'ng-inline-svg';

//Plugin Modules
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

//Application Modules
import { LoggerModule, NotificationModule, PipeModule, TranslateModule, ValidatorModule } from 'ellaisys-lib';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { ModalNoteComponent } from './modal-note/modal-note.component';
import { ModalDocumentComponent } from './modal-document/modal-document.component';
import { ModalDeleteConfimComponent } from './modal-delete-confim/modal-delete-confim.component';
import { WidgetSubheaderComponent } from './widget-subheader/widget-subheader.component';


@NgModule({
  declarations: [
    //CRMO Widgets
    ModalNoteComponent, 
    ModalDocumentComponent, 
    ModalDeleteConfimComponent,
    WidgetSubheaderComponent,
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
    ModalDeleteConfimComponent,
    WidgetSubheaderComponent,
  ]
})
export class WidgetsModule { }
