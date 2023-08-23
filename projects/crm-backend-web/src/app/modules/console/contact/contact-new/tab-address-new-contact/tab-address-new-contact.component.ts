import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

//Third Party components and libraries
import moment from 'moment';
import { NgbActiveModal, NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from 'projects/crmo-backend/src/app/modules/base.component';

//Application Libraries
import { NotificationService } from 'common-lib';
import { IOrganization, ILookup, ILookupValue, ICountry } from 'crmo-lib';


@Component({
  selector: 'crmo-backend-tab-address-new-contact',
  templateUrl: './tab-address-new-contact.component.html',
  styleUrls: ['./tab-address-new-contact.component.scss']
})
export class TabAddressNewContactComponent extends BaseComponent implements OnInit {
  @Input('form') contactProfileForm: FormGroup = null;

  //Common attributes
  public boolLoadingPage: boolean = false;
  public boolLoading: boolean = false;
  public boolSaving: boolean = false;
  public hasError: boolean = false;

  public objCompany: any;
  public objGender: ILookup;
  public listLookupAddressType: ILookupValue[];

  public listCountries: ICountry[];

  public boolNewFormAddedToArray: boolean = false;
  public contactAddressForm: FormGroup;
  public contactAddressFormArray: FormArray = new FormArray([]);

  public ngbDatepickerConfig: any = {};
  public imgContactAvatar: string = 'assets/media/users/default.jpg';
  

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _cd: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _notification : NotificationService,
  ) { super(); 
  
  }


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
    //Loading Page
    this.boolLoadingPage=true;

    //Load country values
    this.listCountries = this._globals.getCountries();
    // if (this.objGender) {
    //   this.listCountries = (this.objGender?.values).filter((x: ICountry) => {return x.is_active==true});
    // } //End if 

    //Load lookup values (Address Type)
    let objAddressType: ILookup = this._globals.getLookupByKey('contact_address_type');
    if (objAddressType) {
      this.listLookupAddressType = (objAddressType?.values).filter((x: ILookupValue) => {return x.is_active==true});
    } //End if

    this.contactAddressForm = this.fnContactAddressForm();
    this.boolNewFormAddedToArray = false;
  } //Function ends


  /**
   * Add Control to the Form Array
   * 
   * @param typeKey 
   * @param isDefault 
   */
  public fnAddContactDetailControl(): void {
    //Add validators
    this.contactAddressForm.controls['country_code'].setValidators([Validators.required]);

    //Add the contact-detail form to base contact form
    this.contactAddressFormArray?.push(this.contactAddressForm)

    this.boolNewFormAddedToArray=true;

    //Added to handle error (NG0100: ExpressionChangedAfterItHasBeenCheckedError)
    this._cd.detectChanges();
  } //Function ends


  /**
   * Remove control from the Form Array
   * 
   * @param formIndex 
   */
  public fnRemoveContactDetailControl(formIndex: number): void {
    //Create contact details form array
    this.contactAddressFormArray?.removeAt(formIndex);

    //Added to handle error (NG0100: ExpressionChangedAfterItHasBeenCheckedError)
    this._cd.detectChanges();
  } //Function ends


  public fnOnControlModify(event: any): void {
    try {
      if (this.contactAddressForm.dirty) {

        //Check if the existing form is added to array
        if (this.boolNewFormAddedToArray) {
          console.log(event);
        } else {
          this.fnAddContactDetailControl();

          this.contactProfileForm.setControl('addresses', this.contactAddressFormArray);
        }
      }
    } catch (error) {
      throw error;
    } //Try-catch error
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


