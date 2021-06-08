import { Component, HostListener, OnInit } from '@angular/core';

//Third-part references
import { NgbActiveModal, NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


//Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { ContactService, IContact } from 'crmo-lib';
import { BaseComponent } from '../../../base.component';
import { UppyConfig } from 'uppy-angular';
import { environment } from 'eis/apps/crmomni-web/src/environments/environment';


@Component({
  selector: 'crmo-backend-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent extends BaseComponent implements OnInit {
  //Common attributes
  public isLoading: boolean = false;
  public boolUploading: boolean = false;  //Upload Modal

  public listContact: IContact[] = null;
  public pageRecordsLoaded: number = 0;
  public pageTotalSize: number = 100;
  public uppySettings: UppyConfig = {
    uploadAPI: {
      endpoint: 'api/contact/upload',
      headers: {
        Authorization: 'bearer ' + this._globals.getClaim()['token']
      }
    },
    plugins: {
      Webcam: false,
      GoogleDrive: true,
      Instagram: false,
      Facebook: false,
      Dropbox: true,
      ScreenCapture:false
    },
    restrictions: {
      maxFileSize: 1000000,
      maxNumberOfFiles: 1,
      minNumberOfFiles: 1,
      allowedFileTypes: ['.csv', '.xls', '.xlsx']
    },
    statusBarOptions: {
      hideUploadButton: true,
    },
    uploaderLook: {
      note: 'abcd efg kml',
      proudlyDisplayPoweredByUppy: false
    },
    options: {
      id: 'crmoni', //A site-wide unique ID for the instance.
      debug: false,
      browserBackButtonClose: true,
      autoProceed: false, //Setting this to true will start uploading automatically after the first file is selected without waiting for upload button trigger.
      allowMultipleUploads: false, //Setting this to true,  users can upload some files, and then add more files and upload those as well
      meta: {} //Metadata object, used for passing things like public keys, usernames, tags and so on
    }
  };

  private viewName: string = '*';
  private filterName: string = 'my_all';
  private pageFrom: number = Globals._LIST_PAGE_DEFAULT_FROM_POSITION;
  private pageSize: number = Globals._LIST_PAGE_DEFAULT_RECORDS_DISPLAYED;
  private isScrollLoading: boolean = false;
  private elemPage: any;
  private scrollId: string = 'abcd';
  private payload: any = null;
  private modalUploadRef: NgbModalRef;
  

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _contactService: ContactService,
    private _modalService: NgbModal,
    private _modalConfig: NgbModalConfig
  ) { super(); }


  /**
   * Lifecycle Hook's
   */
  ngOnInit(): void {

    //Initilaize component
    this.fnInitialize();
  } //Function ends


  /**
   * Initialize
   */
  private fnInitialize(): void {
    this.fnLoadListData();
  } //Function ends


  /**
   * Load the listing data from the server
   * 
   * @param showLoader 
   */
  private fnLoadListData(showLoader: boolean = true): void {
    //Page view, position and size
    let pageFrom: string = (this.pageFrom > 0) ? this.pageFrom.toString() : '1';
    let pageSize: string = (this.pageSize > 0) ? this.pageSize.toString() : '10';

    //Set loading status
    this.isLoading = showLoader;
    this.isScrollLoading = true;

    //Build Params
    let params: Object = {
      'view': this.viewName,
      'filter': this.filterName,
      'page': pageFrom,
      'size': pageSize,
    };

    //Fetch data from server
    this._contactService.getAll(this.payload, params)
      .subscribe((response: IContact[]) => {
        //Clear leading status
        this.isLoading = false;
        this.isScrollLoading = false;

        let dataArray: IContact[] = response;
        if (dataArray && dataArray.length > 0) {
          if (!this.listContact) { this.listContact = []; }

          //Fill list array
          dataArray.forEach((data: IContact) => {
            this.listContact.push(data);
          });

          //Set records loaded size
          this.pageRecordsLoaded = (this.listContact && this.listContact.length > 0) ? this.listContact.length : 0;
          if (this.pageRecordsLoaded < 1) {
            this.fnResetPageCounters();
          } //End if
        } else {
          //this.fnResetPageCounters();
        } //End If

        //Handle Scroll 
        this.fnAdjustScroll();
      }, (error) => {
        //Stop loader
        this.isLoading = false;
        this.isScrollLoading = false;

        throw error;
      });
  } //Function ends


  public fnSortColumn(columnName: string, sortDir: string): void {

  } //Function ends


  public fnUploadAction(event, container): void {
    this.modalUploadRef = this._modalService.open(container, {size: 'lg'});
  } //Function ends


  public fnCloseUploadModal(isDismissed: boolean = false): void {
    this.modalUploadRef.close({dismissed: isDismissed});
  }


  /**
   *   Handle Scrolling List
   */
  @HostListener('window:scroll', ['$event'])
  onScroll(elem: any) {
    this.elemPage = elem;

    if (!this.isScrollLoading) {
      if (this.pageTotalSize > this.pageFrom) {
        //Get event target data
        let scrollTop: number = (document.documentElement.scrollTop || document.body.scrollTop);
        let offsetHeight: number = document.documentElement.offsetHeight;
        let scrollHeight: number = document.documentElement.scrollHeight;

        //Calculate scroll ratio
        let scrollRatio: number = (scrollTop + offsetHeight) / scrollHeight;

        //Trigger the event based on scroll factor
        if (scrollRatio > (Globals._SCROLL_RELOAD_FACTOR)) {
          if (this.scrollId) {
            this.pageFrom ++;
            this.fnLoadListData(true);
          } //End if
        } //End If
      } //End If
    } //End if
  } // Function Ends


  /**
   * Adjust the scroll height
   */
  private fnAdjustScroll() {
    let event = this.elemPage;
    if (event && event.target) {
      //Get event target data
      let offsetHeight: number = event.target.offsetHeight;
      let scrollHeight: number = event.target.scrollHeight;

      //Calculated Top Value
      let scrollTop = ((Globals._SCROLL_RELOAD_FACTOR) * scrollHeight) - offsetHeight;

      event.target.scrollTop = scrollTop;
    } //End if
  } //Function ends


  /**
   * Reset the page counters
   */
  private fnResetPageCounters(): void {
    //Reset array object
    this.listContact = [];

    //Reset variables
    this.pageRecordsLoaded = 0;
    this.pageTotalSize = 0;
    this.pageFrom = Globals._LIST_PAGE_DEFAULT_FROM_POSITION;
    this.pageSize = Globals._LIST_PAGE_DEFAULT_RECORDS_DISPLAYED;

    this.scrollId = null;
  } //Function ends

} //Class ends
