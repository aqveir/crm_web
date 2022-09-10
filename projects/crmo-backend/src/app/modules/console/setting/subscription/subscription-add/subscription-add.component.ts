import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Third Party referenced libraries
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../../base.component';

//Application Libraries
import { EventBrokerService, NotificationService } from 'ellaisys-lib';
import { IPaymentMethod, PaymentMethodService } from 'crmo-lib';
import { ModalAddPaymentmethodComponent } from '../../../widgets/modal-add-paymentmethod/modal-add-paymentmethod.component';

@Component({
  selector: 'crmo-backend-subscription-add',
  templateUrl: './subscription-add.component.html',
  styleUrls: ['./subscription-add.component.scss']
})
export class SubscriptionAddComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;
  public boolSaving: boolean = false;
  public hasError: boolean = false;

  public oHash: string;
  public uuid: string;
  public objRole: any;
  public boolRefresh: boolean = false;
  public boolIsNew: boolean = false;
  public listPaymentMethods: IPaymentMethod[];
  public roleForm!: FormGroup;


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
    private _modalService: NgbModal,
    private _modalConfig: NgbModalConfig,
    private _paymentmethodService: PaymentMethodService,
    private _notification : NotificationService,
    private _broker: EventBrokerService
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
    //Show Submenu
    this._broker.emit(Globals.EVENT_SHOW_SUBMENU, true);

    //Get params from the page route
    let oHash: string = this._route.snapshot.paramMap.get('ohash');
    let uuid: string = this._route.snapshot.paramMap.get('uuid');

    this.oHash = oHash;
    this.uuid = uuid;

    //Load data for the subscriptions
    this.fnLoadData();
  } //Function ends

  
  /**
   * Create data
   */
  private fnCreateData(): void {
    this.objRole = {
      hash: null,
      avatar: null,
      username: null,
      first_name: null,
      last_name: null,
      email: null,
      phone: null,
      language: 'en',
      is_remote_access_only: false
    };
  } //Function ends
 
  
  /**
   * Get Data
   */
  public fnLoadData(): boolean {
    try {
      //Build the params for passing
      let params: Object = {'key': this.oHash};

      return this.fnLoadPaymentMethodsData();

    } catch (error) {
      //Stop loader
      this.boolLoading = false;

      throw error;
    } //Try-catch ends
  } //Function ends
 
  
  /**
   * Get Payment Methods Data
   */
  private fnLoadPaymentMethodsData(): boolean {
    try {
      //Build the params for passing
      let params: Object = {'key': this.oHash};

      this.boolLoading = true;
      this._paymentmethodService.getAll(params)
        .subscribe((response: any) => {
          //Stop loader
          this.boolLoading = false;

          //Fill Data into variable
          this.listPaymentMethods = response;
        },(error) => {
          //Stop loader
          this.boolLoading = false;

          throw error;
        });

        return true;
    } catch (error) {
      //Stop loader
      this.boolLoading = false;

      throw error;
    } //Try-catch ends
  } //Function ends


  /**
   * Reset form
   */
  public fnResetForm(boolNavBack: boolean=false): void {
    //this.organizationForm.reset();

    if (boolNavBack) {
      this._router.navigate(['secure/setting/organization', this.oHash, 'subscription']);
    } //End if
  } //Function ends


  public fnSaveData(event): boolean {
    try {
      this.boolRefresh = true;
      return true;
    } catch (error) {
      throw error;
    } //Try-catch ends 
  } //Function ends


  /**
   * Open Modal for Delete Confirmation
   * 
   * @param event
   * @param type
   */
  public fnAddPaymentMethod(event: any, type: string): void {
    try {

      let customConfig: NgbModalConfig = this._modalConfig;
      customConfig.size = 'md';
      const modalAddPaymentMethodRef = this._modalService.open(ModalAddPaymentmethodComponent, customConfig);
      modalAddPaymentMethodRef.componentInstance.oHash = this.oHash;
      modalAddPaymentMethodRef.result
        .then((result: any) => {
          if (result && result['refresh']) {
            this.fnLoadPaymentMethodsData();     
          } //End if
        }, (reason: any) => {
          throw reason;
        });
      
      event.stopPropagation();
    } catch (error) {
      //Stop loader
      this.boolLoading = false;

      throw error;
    } //Try-catch ends
  } //Function ends 


  /**
   * Open Modal for Delete Confirmation
   * 
   * @param event 
   * @param paymentMethodUuid
   */
  public fnDeletePaymentMethod(event: any, paymentMethodUuid: string): void {
    try {

      this._broker.emit('modal-confirm-delete', [null, (boolResponse: boolean)=>{
        if (boolResponse) {
          //Build the params for passing
          let params: Object = {'key': this.oHash};

          this.boolLoading = false;
          this._paymentmethodService.delete(paymentMethodUuid, params)
            .subscribe((response: any) => {
              //Stop loader
              this.boolLoading = false;

              //Reload data
              this.fnLoadPaymentMethodsData();
            },(error) => {
              //Stop loader
              this.boolLoading = false;

              throw error;
            });
        } else {
          //Do nothing
        } //End if
      }]);
      
      event.stopPropagation();
    } catch (error) {
      //Stop loader
      this.boolLoading = false;

      throw error;
    } //Try-catch ends
  } //Function ends


  /**
   * Check if the given card data is the default card for current organization.
   * 
   * @param month
   * @returns string
   */
  public fnGetMonthName(month: number): string {
    try {
      let monthName: string[] = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
      return monthName[month-1];
    } catch (error) {
      throw error;
    } //Try-catch ends 
  } //Function ends

} //Class ends


