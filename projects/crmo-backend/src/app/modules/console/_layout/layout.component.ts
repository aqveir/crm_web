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
import { EventBrokerService } from 'ellaisys-lib';

//Application Modal Components
import { ModalSendSmsComponent } from '../widgets/modal-send-sms/modal-send-sms.component';
import { ModalSendMailComponent } from '../widgets/modal-send-mail/modal-send-mail.component';
import { ModalConfirmDeleteComponent } from '../widgets/modal-confirm-delete/modal-confirm-delete.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  // Public variables
  public selfLayout: string = 'default';

  public cssAside: string = null;
  public cssContent: string = null;
  public cssContentContainer: string = null;
  public cssFooter: string = null;

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
  
  @ViewChild('ktAside', { static: true }) ktAside: ElementRef;
  @ViewChild('ktHeaderMobile', { static: true }) ktHeaderMobile: ElementRef;
  @ViewChild('ktHeader', { static: true }) ktHeader: ElementRef;

  /**
   * Default constructor
   */
  constructor(
    private initService: LayoutInitService,
    private layout: LayoutService,
    private _broker: EventBrokerService,
    private _modalService: NgbModal,
    private _modalConfig: NgbModalConfig
  ) {
    this.initService.init();

    // Set Modal Config
    _modalConfig.backdrop = 'static';
    _modalConfig.keyboard = false;
    _modalConfig.animation = true;
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
  } //Function closes


  /**
   * Load Broker Listeners for the application
   * 
   * This is very useful for applicaton level modals.
   */
  private fnLoadBrokerListeners(): void {
    //Broker Lister - Modal Component for SMS Send
    this._broker.listen<any>('show_sms_modal', (x: any) => {
      const modalSendSmsRef = this._modalService.open(ModalSendSmsComponent, this._modalConfig);
      modalSendSmsRef.componentInstance.objServiceRequest = x;
    });

    //Broker Lister - Modal Component for Mail Send
    this._broker.listen<any>('show_mail_modal', (x: any) => {
      const modalSendSmsRef = this._modalService.open(ModalSendMailComponent, this._modalConfig);
      modalSendSmsRef.componentInstance.objServiceRequest = x;
    });

    //Broker Lister - Modal Component for Confirm Delete
    this._broker.listen<any>('modal-confirm-delete', (x: string) => {
      const modalConfirmDeleteRef = this._modalService.open(ModalConfirmDeleteComponent, this._modalConfig);
      if (x != null) {
        modalConfirmDeleteRef.componentInstance.strDeleteConfirmText = 'xxxxxx';
      } //End if      
      modalConfirmDeleteRef.result
        .then((result: any) => {
          console.log(result);
        }, (reason: any) => {
          console.log(reason);
        });


      console.log(x);
    });
  } //Function ends

} //Class ends
