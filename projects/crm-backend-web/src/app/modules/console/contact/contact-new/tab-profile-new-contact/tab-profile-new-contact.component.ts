import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

//Third Party components and libraries
import moment from 'moment';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

//Application global files
import { Globals } from 'projects/crm-backend-web/src/app/app.global';
import { BaseComponent } from 'projects/crm-backend/src/app/modules/base.component';

//Application Libraries
import { NotificationService } from 'common-lib';
import { IOrganization, ILookup, ILookupValue } from 'crm-lib';


@Component({
  selector: 'crm-backend-tab-profile-new-contact',
  templateUrl: './tab-profile-new-contact.component.html',
  styleUrls: ['./tab-profile-new-contact.component.scss']
})
export class TabProfileNewContactComponent extends BaseComponent implements OnInit {
  @Input('form') contactProfileForm: FormGroup = null;

  //Common attributes
  public boolLoadingPage: boolean = false;
  public boolLoading: boolean = false;
  public boolSaving: boolean = false;
  public hasError: boolean = false;

  public objCompany: any;
  public objGender: ILookup;
  public listLookupGender: ILookupValue[];
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


  /**
   * File control change event
   * 
   * @param event 
   */
  public fnFileUploadChangeEvent(event: any): void {
    try {
      let uploadedFile: File;

      if (event?.target?.files && event.target.files[0]) {
        uploadedFile = event?.target?.files[0];

        //Check if the file object is valid
        if (uploadedFile) {
          //Read the file and assign to local variable
          const reader: FileReader = new FileReader();
          reader.readAsDataURL(uploadedFile);
          reader.onload = (evt) => {
            this.imgContactAvatar = evt.target.result as string; 
          };

          //Assign the value to form control
          this.contactProfileForm.patchValue({
            avatar: uploadedFile
          });
        } //End if
      } //End if
    } catch(error) {
      throw error;
    } //Try-catch ends
  } //Function ends


  /**
   * Initialize
   */
  private fnInitialize(): void {
    //Loading Page
    this.boolLoadingPage=true;

    //Load lookup values
    this.objGender = this._globals.getLookupByKey('contact_gender');
    if (this.objGender) {
      this.listLookupGender = (this.objGender?.values).filter((x: ILookupValue) => {return x.is_active==true});
    } //End if

    //Add primary email
    this.fnAddContactDetailControl('contact_detail_type_email', true);

    //Add primary phone
    this.fnAddContactDetailControl('contact_detail_type_phone', true);    
    
    //this._cd.detach();
    setTimeout(() => {
      this.contactProfileForm.setControl('details', this.contactDetailsFormArray);

      //Page loaded completely
      this.boolLoadingPage=false;
    },0)
  } //Function ends


  /**
   * Add Control to the Form Array
   * 
   * @param typeKey 
   * @param isDefault 
   */
  public fnAddContactDetailControl(typeKey: string, isDefault: boolean=false): void {
    //Create new contact detail form
    let newContactDetailForm: FormGroup = this.fnContactDetailsForm();
    newContactDetailForm.patchValue({
      type_key: typeKey,
      is_primary: isDefault
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
      phone_form_control: ['']
    });
  } //Function ends

} //Class ends

