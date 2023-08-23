import { Component, OnInit, Input, ChangeDetectorRef, OnChanges, SimpleChanges, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

//Third Party components and libraries
import moment from 'moment';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from 'projects/crmo-backend/src/app/modules/base.component';

//Application Libraries
import { EventBrokerService, NotificationService } from 'common-lib';
import { ILookup, ILookupValue, IContact, ICountry, IContactAddress } from 'crmo-lib';

@Component({
  selector: 'crmo-backend-tab-address',
  templateUrl: './tab-address.component.html',
  styleUrls: ['./tab-address.component.scss'],
  providers: [ NgbActiveModal ]
})
export class TabAddressComponent extends BaseComponent implements OnInit, OnChanges, AfterContentInit {
  @Input('form') contactProfileForm: FormGroup = null;
  @Input('contact') objContact: IContact = null;
  @Input('refresh') boolRefresh: boolean = false;

  //Common attributes
  public boolLoadingPage: boolean = false;
  public boolLoading: boolean = false;
  public boolSaving: boolean = false;
  public hasError: boolean = false;

  public listCountries: ICountry[];
  public listLookupAddressType: ILookupValue[];
  public listLookupContactDetailsSubType: ILookupValue[];
  public contactAddressForm: FormGroup;
  public contactAddressFormArray: FormArray = new FormArray([]);
  

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _cd: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _modalService: NgbModal,
    private _broker: EventBrokerService,
    private _notification : NotificationService,
  ) { super(); }


  /**
   * Lifecycle Hook's
   */
  ngOnInit(): void {

    //Initilaize component
    this.fnInitialize();
  } //Function ends
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.objContact) {
      if (!changes.objContact.firstChange) {
        let objContact: IContact = changes.objContact.currentValue;

        if (objContact) {
          //Load contact address array
          this.fnLoadContactAddressArray(objContact?.addresses);        
        } //End if
      } //End if
    } //End if
  } //Function ends
  ngAfterContentInit(): void {
    //Attach Form Control Array to main FormGroup
    this.contactProfileForm.setControl('addresses', this.contactAddressFormArray);

    //Page loaded completely
    this.boolLoadingPage=false;
  } //Function ends


  /**
   * Initialize
   */
  private fnInitialize(): void {
    //Loading Page
    this.boolLoadingPage=true;

    //Load country values
    this.listCountries = this._globals.getCountries();

    //Load lookup values (Contact Address Type)
    let objAddressType: ILookup = this._globals.getLookupByKey('contact_address_type');
    if (objAddressType) {
      this.listLookupAddressType = (objAddressType?.values).filter((x: ILookupValue) => {return x.is_active==true});
    } //End if

    this.contactAddressForm = this.fnContactAddressForm();
  } //Function ends


  /**
   * Add Control to the Form Array
   * 
   * @param listContactAddresses 
   */
  private fnLoadContactAddressArray(listContactAddresses: IContactAddress[]): void {
    if (listContactAddresses && (listContactAddresses instanceof Array) && listContactAddresses.length>0 ) {

      //Iterate the contact address array
      listContactAddresses.forEach((objContactAddress: IContactAddress) => {

        //Create contact address form
        let newContactAddressForm: FormGroup = this.fnContactAddressForm();
        newContactAddressForm.patchValue({
          type_key: 'contact_address_type_home',
          address1: objContactAddress?.address1,
          address2: objContactAddress?.address2,
          locality: objContactAddress?.locality,
          city: objContactAddress?.city,
          state: '',
          country_code: objContactAddress?.country?.alpha2_code,
          zipcode: objContactAddress?.zipcode
        });

        //Add the contact-address form to base contact form
        this.contactAddressFormArray?.push(newContactAddressForm)        
      });
    } //Endif

    //Added to handle error (NG0100: ExpressionChangedAfterItHasBeenCheckedError)
    this._cd.detectChanges();
  } //Function ends


  /**
   * Function to filter the contact details subtype
   * called from the html page
   * 
   * @param filter 
   */
  public fnGetSubtypeFiltered(filter: string): ILookupValue[] {
    let listReturnValue: ILookupValue[] = null;
    try {
      listReturnValue = this.listLookupContactDetailsSubType.filter((x: ILookupValue) => {
        return x.key.search(filter)==0;
      });
    } catch (error) {
      throw error;
    } //Try-catch ends
    return listReturnValue;
  } //function ends


  /**
   * Add Control to the Form Array
   * 
   * @param typeKey 
   * @param isDefault 
   */
  public fnAddContactDetailControl(typeKey: string, subtypeKey: string = null, isDefault: boolean=false): void {
    //Create new contact detail form
    let newContactAddressForm: FormGroup = this.fnContactAddressForm();
    newContactAddressForm.patchValue({
      type_key: typeKey,
      subtype_key: subtypeKey,
      is_primary: isDefault,
      is_verified: false
    });

    //Add Email validation
    if (typeKey=='contact_detail_type_email') {
      newContactAddressForm.controls['identifier'].setValidators([Validators.required, Validators.email]);
    } //End if

    //Add Email validation
    if (typeKey=='contact_detail_type_phone') {
      //newContactAddressForm.controls['phone_form_control'].setValidators([Validators.required]);
    } //End if

    //Add the contact-detail form to base contact form
    this.contactAddressFormArray?.push(newContactAddressForm)

    //Added to handle error (NG0100: ExpressionChangedAfterItHasBeenCheckedError)
    this._cd.detectChanges();
  } //Function ends


  /**
   * Remove control from the Form Array
   * 
   * @param formIndex 
   */
  private fnRemoveContactDetailControl(formIndex: number): void {
    //Create contact details form array
    this.contactAddressFormArray?.removeAt(formIndex);

    //Added to handle error (NG0100: ExpressionChangedAfterItHasBeenCheckedError)
    this._cd.detectChanges();
  } //Function ends


  /**
   * Radio Button click event
   * 
   * @param event 
   * @param typeKey 
   * @param formIndex 
   */
  public fnChangeEvent(event, typeKey: string, formIndex: number): void {
    let selectedControl: FormGroup = this.contactAddressFormArray.at(formIndex) as FormGroup;
    let listControl: any[] = this.contactAddressFormArray.controls;

    //Iterate all controls
    listControl.forEach((elemForm: FormGroup) => {
      //Find matching types and exclude the selected control/form-group
      if (elemForm.controls['type_key'].value == typeKey && (elemForm!=selectedControl)) {
        //Change the key state and disable email for validations.
        elemForm.patchValue({ is_primary: false }, {emitEvent: false});        
      } //End if
    });

    //Added to handle error (NG0100: ExpressionChangedAfterItHasBeenCheckedError)
    this._cd.detectChanges();
  } //Function ends

  

  public fnOnControlModify(event: any): void {
    try {
      if (this.contactAddressForm.dirty) {

      }
    } catch (error) {
      throw error;
    } //Try-catch error
  } //Function ends

  public fnAddAction(event: any, context: any): void {
    const modalContactAddressRef = this._modalService.open(context, { size: 'lg', centered: true }).result.then((result) => {
        console.log(`Closed with: ${result}`);
      }, (reason) => {
        console.log(`Dismissed ${reason}`);
      });
  }

  public fnEditAction(formIndex: number): void {
    
  }


  

  /**
   * Delete Contact Address action
   * 
   * @param objContactAddress 
   */
  public fnDeleteAction(formIndex: number): void {
    //Show a confirmation modal
    this._broker.emit('modal-confirm-delete', [null, ((status: boolean)=>{
      if (status == true) {
        this.fnRemoveContactDetailControl(formIndex);
      } //End if
    })]);
  } //Function ends


  /**
   * Initialize Reactive Form
   */
  private fnContactAddressForm() {
    return this._formBuilder.group({
      type_key: ['contact_address_type_home'],
      address1: [ '' ],
      address2: [''],
      locality: [''],
      city: [''],
      state: [''],
      country_code: [null],
      zipcode: ['']
    });
  } //Function ends

} //Class ends
