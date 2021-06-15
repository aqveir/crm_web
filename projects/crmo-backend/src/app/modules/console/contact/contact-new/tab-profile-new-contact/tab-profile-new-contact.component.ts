import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from 'projects/crmo-backend/src/app/modules/base.component';

//Application Libraries
import { NotificationService } from 'ellaisys-lib';
import { IOrganization, ILookup, ILookupValue } from 'crmo-lib';


@Component({
  selector: 'crmo-backend-tab-profile-new-contact',
  templateUrl: './tab-profile-new-contact.component.html',
  styleUrls: ['./tab-profile-new-contact.component.scss']
})
export class TabProfileNewContactComponent extends BaseComponent implements OnInit {
  @Input('form') contactProfileForm: FormGroup = null;
  @Input('contact') objContact: IOrganization = null;
  @Input('refresh') boolRefresh: boolean = false;

  //Common attributes
  public boolLoading: boolean = false;
  public boolSaving: boolean = false;
  public hasError: boolean = false;

  public objCompany: any;
  public objGender: ILookup;
  public listLookupGender: ILookupValue[];
  public contactDetailsFormArray: FormArray = new FormArray([]);
  

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
  public fnFileUploadChangeEvent(event): void {
    try {
      let uploadedFile: File;

      if (event?.target?.files) {
        uploadedFile = event?.target?.files[0];
        this.contactProfileForm.patchValue({
          logo: uploadedFile
        });
        console.log(uploadedFile);
      } //End if
    } catch(error) {
      throw error;
    } //Try-catch ends
  } //Function ends


  /**
   * Initialize
   */
  private fnInitialize(): void {
    //Load lookup values
    this.objGender = this._globals.getLookupByKey('contact_gender');
    if (this.objGender) {
      this.listLookupGender = (this.objGender?.values).filter((x: ILookupValue) => {return x.is_active==true});
    } //End if

    this.contactProfileForm.setControl('details', this.contactDetailsFormArray);

    //Add primary email
    this.fnAddContactDetailControl('contact_detail_type_email', true);

    //Add primary phone
    this.fnAddContactDetailControl('contact_detail_type_phone', true);
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

