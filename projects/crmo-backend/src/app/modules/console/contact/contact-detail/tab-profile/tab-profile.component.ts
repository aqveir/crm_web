import { Component, OnInit, Input, ChangeDetectorRef, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

//Third Party components and libraries
import moment from 'moment';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from 'projects/crmo-backend/src/app/modules/base.component';

//Application Libraries
import { NotificationService } from 'ellaisys-lib';
import { ILookup, ILookupValue, IContact, IContactDetail } from 'crmo-lib';

@Component({
  selector: 'crmo-backend-tab-profile',
  templateUrl: './tab-profile.component.html',
  styleUrls: ['./tab-profile.component.scss']
})
export class TabProfileComponent extends BaseComponent implements OnInit, OnChanges, AfterContentInit {
  @Input('form') contactProfileForm: FormGroup = null;
  @Input('contact') objContact: IContact = null;
  @Input('refresh') boolRefresh: boolean = false;

  //Common attributes
  public boolLoadingPage: boolean = false;
  public boolLoading: boolean = false;
  public boolSaving: boolean = false;
  public hasError: boolean = false;

  public objCompany: any;
  public listLookupGender: ILookupValue[];
  public listLookupContactDetailsSubType: ILookupValue[];
  public contactDetailsFormArray: FormArray = new FormArray([]);

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
          //Load contact details array
          this.fnLoadContactDetailArray(objContact?.details);

          console.log('this.contactDetailsFormArray', this.contactDetailsFormArray);         
        } //End if
      } //End if
    } //End if
  } //Function ends
  ngAfterContentInit(): void {
    //Attach Form Control Array to main FormGroup
    this.contactProfileForm.setControl('details', this.contactDetailsFormArray);

    //Page loaded completely
    this.boolLoadingPage=false;
  } //Function ends


  /**
   * Initialize
   */
  private fnInitialize(): void {
    //Loading Page
    this.boolLoadingPage=true;

    //Load lookup values (Gender)
    let objGender: ILookup = this._globals.getLookupByKey('contact_gender');
    if (objGender) {
      this.listLookupGender = (objGender?.values).filter((x: ILookupValue) => {return x.is_active==true});
    } //End if

    //Load lookup values (ConactDetails-SubTypes)
    let objContactDetailSubType: ILookup = this._globals.getLookupByKey('contact_detail_subtype');
    if (objContactDetailSubType) {
      this.listLookupContactDetailsSubType = (objContactDetailSubType?.values).filter((x: ILookupValue) => {return x.is_active==true});

      console.log('this.listLookupContactDetailsSubType', this.listLookupContactDetailsSubType);
    } //End if
  } //Function ends


  /**
   * Add Control to the Form Array
   * 
   * @param typeKey 
   * @param isDefault 
   */
  private fnLoadContactDetailArray(listContactDetails: IContactDetail[]): void {
    let contactDetailEmailTypeCount: number = 0;
    let contactDetailPhoneTypeCount: number = 0;

    if (listContactDetails && (listContactDetails instanceof Array) && listContactDetails.length>0 ) {

      //Iterate the contact details array
      listContactDetails.forEach((objContactDetail: IContactDetail) => {

        //Create contact detail form
        let newContactDetailForm: FormGroup = this.fnContactDetailsForm();
        newContactDetailForm.patchValue({
          type_key: objContactDetail?.type?.key,
          subtype_key: objContactDetail?.subtype?.key,
          phone_idd: objContactDetail?.country?.phone_idd_code,
          identifier: objContactDetail?.identifier,
          is_primary: objContactDetail?.is_primary,
          is_verified: objContactDetail?.is_verified,
        });

        //Add Email validation
        if (objContactDetail?.type?.key=='contact_detail_type_email') {
          contactDetailEmailTypeCount++;
          newContactDetailForm.controls['identifier'].setValidators([Validators.required, Validators.email]);
        } //End if

        //Add Email validation
        if (objContactDetail?.type?.key=='contact_detail_type_phone') {
          contactDetailPhoneTypeCount++;
          //newContactDetailForm.controls['phone_form_control'].setValidators([Validators.required]);
        } //End if

        //Add the contact-detail form to base contact form
        this.contactDetailsFormArray?.push(newContactDetailForm)        
      });
    } //Endif

    //Add primary email, if missing
    if (contactDetailEmailTypeCount==0) {
      this.fnAddContactDetailControl('contact_detail_type_email', null, true);
    } //End if

    //Add primary phone, if missing
    if (contactDetailPhoneTypeCount==0) {
      this.fnAddContactDetailControl('contact_detail_type_phone', null, true);
    } //End if

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
    let newContactDetailForm: FormGroup = this.fnContactDetailsForm();
    newContactDetailForm.patchValue({
      type_key: typeKey,
      subtype_key: subtypeKey,
      is_primary: isDefault,
      is_verified: false
    });

    //Add Email validation
    if (typeKey=='contact_detail_type_email') {
      newContactDetailForm.controls['identifier'].setValidators([Validators.required, Validators.email]);
    } //End if

    //Add Email validation
    if (typeKey=='contact_detail_type_phone') {
      //newContactDetailForm.controls['phone_form_control'].setValidators([Validators.required]);
    } //End if

    //Add the contact-detail form to base contact form
    this.contactDetailsFormArray?.push(newContactDetailForm)

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
    this.contactDetailsFormArray?.removeAt(formIndex);

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
    let selectedControl: FormGroup = this.contactDetailsFormArray.at(formIndex) as FormGroup;
    let listControl: any[] = this.contactDetailsFormArray.controls;

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


  /**
   * Date/Time Control Update Event
   * 
   * @param event
   */
  public fnDateTimeControlUpdated(event: NgbDate): void {
    //Get Date-Time picker values
    let dobAt: moment.Moment = moment(this.contactProfileForm.controls['dob_date_picker'].value).subtract(1, 'month');

    this.contactProfileForm.patchValue({
      date_of_birth_at: dobAt.toISOString(true)
    });
  } //Function ends


  /**
   * Initialize Reactive Form
   */
  private fnContactDetailsForm() {
    return this._formBuilder.group({
      type_key: [ '', [ Validators.required ]],
      subtype_key: [''],
      phone_idd: [''],
      identifier: [''],
      is_primary: [false],
      is_verified: [false],
      phone_form_control: ['']
    });
  } //Function ends

} //Class ends

