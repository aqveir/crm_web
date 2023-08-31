import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

//Application libraries
import { EventBrokerService } from 'common-lib';
import { IContact, INote, IServiceRequestMinimal, NoteService} from 'crm-lib';

//Application Files
import { Globals } from 'projects/crm-backend-web/src/app/app.global';
import { BaseComponent } from '../../../../base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'crm-backend-tab-service-request',
  templateUrl: './tab-service-request.component.html',
  styleUrls: ['./tab-service-request.component.scss']
})
export class TabServiceRequestComponent extends BaseComponent implements OnInit {
  @Input('contact') objContact: IContact = null;
  @Output('refresh') boolRefresh: EventEmitter<boolean> = new EventEmitter<boolean>();


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _broker: EventBrokerService,
    private _noteService: NoteService
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

    //this.fnLoadData();
  } //Function ends


  public fnRedirectToPage(objServiceRequest: IServiceRequestMinimal): void {
    if (objServiceRequest?.category?.key) {
      let pathRedirect: string = null;
      switch (objServiceRequest?.category?.key) {
        case 'service_request_category_lead':
          pathRedirect = 'secure/lead';
          break;

        case 'service_request_category_support':
          pathRedirect = 'secure/support';
          break;
      
        case 'service_request_category_opportunity':
        default:
          pathRedirect = 'secure/opportunity';
          break;
      } //Switch ends

      //Router Navigate
      this._router.navigate([pathRedirect, objServiceRequest?.hash, {cHash: this.objContact.hash}]);
    } //End if
  } //Function ends

} //Class ends

