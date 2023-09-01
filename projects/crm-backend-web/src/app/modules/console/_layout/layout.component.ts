import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { LayoutService, LayoutInitService } from '../../../_metronic/core';
import KTLayoutContent from '@asset-backend/js/layout/base/content';

//Third Party referenced libraries
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

//Application common libraries
import { EventBrokerService, NotificationService, TranslateService } from 'common-lib';
import { INote } from 'crm-lib';

//Application Modal Components
import { ModalNoteComponent } from '../widgets/modal-note/modal-note.component';
import { ModalSendSmsComponent } from '../widgets/modal-send-sms/modal-send-sms.component';
import { ModalSendMailComponent } from '../widgets/modal-send-mail/modal-send-mail.component';
import { ModalConfirmDeleteComponent } from '../widgets/modal-confirm-delete/modal-confirm-delete.component';
import { ModalConfirmCallComponent } from '../widgets/modal-confirm-call/modal-confirm-call.component';
import { ModalTaskComponent } from '../widgets/modal-task/modal-task.component';
import { ModalFiltersComponent } from '../widgets/modal-filters/modal-filters.component';
import { ModalDocumentComponent } from '../widgets/modal-document/modal-document.component';
import { Globals } from '../../../app.global';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  // Public variables
  public selfLayout: string = 'default';

  public cssAside: string|null = null;
  public cssContent: string|null = null;
  public cssContentContainer: string|null = null;
  public cssFooter: string|null = null;

  public boolSubHeaderDisplay: boolean = false;
  public boolAsideSelfDisplay: boolean = true;
  public boolContentExtended: boolean = false;
  public boolFooterDisplay: boolean = false;
  public boolExtrasScroll2TopDisplay: boolean = false;
  
  asideHTMLAttributes: any = {};
  headerMobileClasses: string = '';
  headerMobileAttributes: any = {};
  
  headerCSSClasses: string = '';
  headerHTMLAttributes: any = {};

  // offcanvases
  extrasSearchOffcanvasDisplay: boolean = false;
  extrasNotificationsOffcanvasDisplay: boolean = false;
  extrasQuickActionsOffcanvasDisplay: boolean = false;
  extrasCartOffcanvasDisplay: boolean = false;
  extrasUserOffcanvasDisplay: boolean = false;
  extrasQuickPanelDisplay: boolean = false;
  
  @ViewChild('ktAside', { static: true }) ktAside: ElementRef|null=null;
  @ViewChild('ktHeaderMobile', { static: true }) ktHeaderMobile: ElementRef|null=null;
  @ViewChild('ktHeader', { static: true }) ktHeader: ElementRef|null=null;

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private initService: LayoutInitService,
    private layout: LayoutService,
    private _broker: EventBrokerService,
    private _modalService: NgbModal,
    private _modalConfig: NgbModalConfig,
    private _translate: TranslateService,
    private _notification: NotificationService
  ) {
    this.initService.init();

    // Set Modal Config
    _modalConfig.backdrop = 'static';
    _modalConfig.keyboard = false;
    _modalConfig.animation = true;
    _modalConfig.size = 'md';
  }

  ngOnInit(): void {
    // build view by layout config settings
    this.selfLayout = this.layout.getProp('self.layout');
    this.cssAside = this.layout.getStringCSSClasses('aside');
    this.cssContent = this.layout.getStringCSSClasses('content');
    this.cssContentContainer = this.layout.getStringCSSClasses('content_container');
    this.cssFooter = this.layout.getStringCSSClasses('footer');

    this.boolSubHeaderDisplay = this.layout.getProp('subheader.display');
    this.boolAsideSelfDisplay = this.layout.getProp('aside.self.display');
    this.boolContentExtended = this.layout.getProp('content.extended');
    this.boolFooterDisplay = this.layout.getProp('footer.display');

    this.asideHTMLAttributes = this.layout.getHTMLAttributes('aside');
    
    this.headerMobileClasses = this.layout.getStringCSSClasses('header_mobile');
    this.headerMobileAttributes = this.layout.getHTMLAttributes('header_mobile');
    
    
    this.headerCSSClasses = this.layout.getStringCSSClasses('header');
    this.headerHTMLAttributes = this.layout.getHTMLAttributes('header');
    // offcanvases
    if (this.layout.getProp('extras.search.display')) {
      this.extrasSearchOffcanvasDisplay =
        this.layout.getProp('extras.search.layout') === 'offcanvas';
    }

    if (this.layout.getProp('extras.notifications.display')) {
      this.extrasNotificationsOffcanvasDisplay =
        this.layout.getProp('extras.notifications.layout') === 'offcanvas';
    }

    if (this.layout.getProp('extras.quickActions.display')) {
      this.extrasQuickActionsOffcanvasDisplay =
        this.layout.getProp('extras.quickActions.layout') === 'offcanvas';
    }

    if (this.layout.getProp('extras.cart.display')) {
      this.extrasCartOffcanvasDisplay =
        this.layout.getProp('extras.cart.layout') === 'offcanvas';
    }

    if (this.layout.getProp('extras.user.display')) {
      this.extrasUserOffcanvasDisplay =
        this.layout.getProp('extras.user.layout') === 'offcanvas';
    }

    this.extrasQuickPanelDisplay = this.layout.getProp(
      'extras.quickPanel.display'
    );

    this.boolExtrasScroll2TopDisplay = this.layout.getProp('extras.scrolltop.display');
  }

  ngAfterViewInit(): void {
    //Load broker listeners
    this.fnLoadBrokerListeners();

    if (this.ktAside) {
      for (const key in this.asideHTMLAttributes) {
        if (this.asideHTMLAttributes.hasOwnProperty(key)) {
          this.ktAside.nativeElement.attributes[key] = this.asideHTMLAttributes[
            key
          ];
        }
      }
    }

    if (this.ktHeaderMobile) {
      for (const key in this.headerMobileAttributes) {
        if (this.headerMobileAttributes.hasOwnProperty(key)) {
          this.ktHeaderMobile.nativeElement.attributes[
            key
          ] = this.headerMobileAttributes[key];
        }
      }
    }

    if (this.ktHeader) {
      for (const key in this.headerHTMLAttributes) {
        if (this.headerHTMLAttributes.hasOwnProperty(key)) {
          this.ktHeader.nativeElement.attributes[
            key
          ] = this.headerHTMLAttributes[key];
        }
      }
    }

    // Init Content
    KTLayoutContent.init('kt_content');
  } //Function ends


  public fnCloseCanvas(event: any): void {

  } //Function ends


  /**
   * Load Broker Listeners for the application
   * 
   * This is very useful for applicaton level modals.
   */
  private fnLoadBrokerListeners(): void {
    //Broker Lister - Modal Component for Filter Screen
    this._broker.listen<any>('show_page_filter', (x: any) => {
      let customConfig: NgbModalConfig = this._modalConfig;
      customConfig.size = 'md';
      const modalFilterRef = this._modalService.open(ModalFiltersComponent, customConfig);
    });

    //Broker Lister - Modal Component for Note Amend
    this._broker.listen<any>('show_note_modal', (x: any) => {
      let customConfig: NgbModalConfig = this._modalConfig;
      customConfig.size = 'md';
      const modalNoteRef = this._modalService.open(ModalNoteComponent, customConfig);
      
      let strEntityType: string = x[0];
      let intReferenceId: number = x[1];
      let objNote: INote = x[2];
      let callback: any = x[3];

      modalNoteRef.componentInstance.strEntityType = strEntityType;
      modalNoteRef.componentInstance.intReferenceId = intReferenceId;
      modalNoteRef.componentInstance.objNote = objNote;

      //Waiting for modal response
      modalNoteRef.result
      .then((result: any) => {
        if (result && result['error']) {
          this._globals.showError('NOTIFICATION.NOTE_MODAL.ERROR_MESSAGE', true);
          console.error('Note add/edit error', result['error']);
          callback(false);
        } else {
          if (result['refresh']==true) {
            this._globals.showSuccess('NOTIFICATION.NOTE_MODAL.SUCCESS_MESSAGE', true);
            callback(true);
          } //End if
        } //End if
      }, (reason: any) => {
        this._globals.showError('NOTIFICATION.NOTE_MODAL.ERROR_MESSAGE', true);
        console.error('Note add/edit error', reason);
        callback(false);
      });
    });

    //Broker Lister - Modal Component for Document Amend
    this._broker.listen<any>('show_document_modal', (x: any) => {
      let customConfig: NgbModalConfig = this._modalConfig;
      customConfig.size = 'lg';
      const modalDocumentRef = this._modalService.open(ModalDocumentComponent, customConfig);
      
      let strEntityType: string = x[0];
      let intReferenceId: number = x[1];
      let callback: any = x[2];

      modalDocumentRef.componentInstance.strEntityType = strEntityType;
      modalDocumentRef.componentInstance.intReferenceId = intReferenceId;

      //Waiting for modal response
      modalDocumentRef.result
      .then((result: any) => {
        if (result && result['error']) {
          this._globals.showError('NOTIFICATION.DOCUMENT_MODAL.UPLOAD_ERROR_MESSAGE', true);
          console.error('Document Upload Error', result['error']);
          callback(false);
        } else {
          if (result['refresh']==true) {
            this._globals.showSuccess('NOTIFICATION.DOCUMENT_MODAL.UPLOAD_SUCCESS_MESSAGE', true);
            callback(true);
          } //End if
        } //End if
      }, (reason: any) => {
        this._globals.showError('NOTIFICATION.DOCUMENT_MODAL.UPLOAD_ERROR_MESSAGE', true);
        console.error('Document Upload Error', reason);
        callback(false);
      });
    });

    //Broker Lister - Modal Component for Task Amend
    this._broker.listen<any>('show_task_modal', (x: any) => {
      let customConfig: NgbModalConfig = this._modalConfig;
      customConfig.size = 'lg';
      const modalTaskRef = this._modalService.open(ModalTaskComponent, customConfig);

      let srHash: string = x[0];
      let objTask: INote = x[1];
      let callback: any = x[2];

      modalTaskRef.componentInstance.srHash = srHash;
      modalTaskRef.componentInstance.objTask = objTask;
    });
    
    //Broker Lister - Modal Component for Initiating Outgoing Call
    this._broker.listen<any>('show_call_modal', (x: any) => {
      let customConfig: NgbModalConfig = this._modalConfig;
      customConfig.size = 'md';

      const modalCallContactRef = this._modalService.open(ModalConfirmCallComponent, customConfig);
      modalCallContactRef.componentInstance.objServiceRequest = x;
    });

    //Broker Lister - Modal Component for SMS Send
    this._broker.listen<any>('show_sms_modal', (x: any) => {
      let customConfig: NgbModalConfig = this._modalConfig;
      customConfig.size = 'md';

      const modalSendSmsRef = this._modalService.open(ModalSendSmsComponent, customConfig);
      modalSendSmsRef.componentInstance.objServiceRequest = x;
    });

    //Broker Lister - Modal Component for Mail Send
    this._broker.listen<any>('show_mail_modal', (x: any) => {
      let customConfig: NgbModalConfig = this._modalConfig;
      customConfig.size = 'md';

      const modalSendSmsRef = this._modalService.open(ModalSendMailComponent, customConfig);
      modalSendSmsRef.componentInstance.objServiceRequest = x;
    });

    //Broker Lister - Modal Component for Confirm Delete
    this._broker.listen<any>('modal-confirm-delete', (x: any) => {
      let customConfig: NgbModalConfig = this._modalConfig;
      customConfig.size = 'md';

      const modalConfirmDeleteRef = this._modalService.open(ModalConfirmDeleteComponent, customConfig);
      let strDeleteConfirmText = x[0];
      let callback: any = x[1];

      //Set Delete Confirmation Text to match
      if ((strDeleteConfirmText != null) && (typeof(strDeleteConfirmText) === 'string')) {
        modalConfirmDeleteRef.componentInstance.strDeleteConfirmText = strDeleteConfirmText;
      } //End if

      //Waiting for modal response
      modalConfirmDeleteRef.result
        .then((result: any) => {
          if (result && result['delete']) {
            callback(result['delete']);            
          } else {
            callback(false);
          } //End if
        }, (reason: any) => {
          callback(false);
        });
    });
  } //Function ends
  
} //Class ends
