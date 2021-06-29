import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../base.component';

//Application Libraries
import { EventBrokerService, NotificationService } from 'ellaisys-lib';
import { ContactService, IContact, ILookup, ILookupValue } from 'crmo-lib';

@Component({
  selector: 'crmo-backend-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;

  public hash: string;
  public objContact: IContact = null;
  public boolRefresh: boolean = false;
  public boolSaving: boolean = false;
  
  public contactForm!: FormGroup;
  public imgContactAvatar: string = 'assets/media/users/default.jpg';

  public listContactType: ILookupValue[];

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _contactService: ContactService,
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


  public fnReloadData($event): void {
    this.fnLoadData(false);
  } //End if


  /**
   * Initialize
   */
  private fnInitialize(): void {
    let hash: string = this._route.snapshot.paramMap.get('hash');
    this.hash = hash;

    //Load lookup values (contact type)
    let objContactType: ILookup = this._globals.getLookupByKey('contact_type');
    if (objContactType) {
      this.listContactType = (objContactType?.values).filter((x: ILookupValue) => {return x.is_active==true});
    } //End if

    //Initialize form
    this.fnInitializeForm();

    //Load data for existing hash value
    this.fnLoadData();
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
          this.contactForm.patchValue({
            avatar: uploadedFile
          });
        } //End if
      } //End if
    } catch(error) {
      throw error;
    } //Try-catch ends
  } //Function ends


  /**
   * Load the data from the server
   * 
   * @param showLoader 
   */
  private fnLoadData(showLoader: boolean = true): void {
    //Set loading status
    this.boolLoading = showLoader;

    //Fetch data from server
    this._contactService.show(this.hash)
      .subscribe((response: IContact) => {
        //Clear leading status
        this.boolLoading = false;

        let data: IContact = response;
        if (data) {
          this.objContact = data;
        } //End If

        //Full the form controls with data
        this.fnFillData();
      }, (error) => {
        //Stop loader
        this.boolLoading = false;

        throw error;
      });
  } //Function ends
  

  /**
   * Save Data
   */
  public fnSaveAction(event: any): boolean {
    try {
      //Check form validity
      this.contactForm.updateValueAndValidity();
      if (this.contactForm.invalid) {  
        let msgError: string = this.fnRaiseErrors(this.contactForm);
        this._notification.error('Error', msgError);
        return false;
      } //End if

      //Set form value to request object (transform to FormData)
      let dataUser: any = this.fnTransformReactiveFormGroup2FormData(this.contactForm);

      this.boolSaving=true;

      //Update Organization
      this._contactService.update(this.hash, dataUser)
      .subscribe((response: any) => {
        //Show notification
        this._globals.showSuccess('NOTIFICATION.USER_DETAILS.SUCCESS_MESSAGE', true);

        //Action based on submitter
        this.fnPostSaveAction(event?.submitter?.id);

        //Stop loader
        this.boolSaving = false;
      },(error) => {
        //Stop loader
        this.boolSaving = false;
        throw error;
      });

      return true;
    } catch (error) {
      //Stop loader
      this.boolSaving = false;

      throw error;
    } //Try-catch ends
  } //Function ends
  

  /**
   * Post Save Action
   * 
   * @param submitterId
   */
  private fnPostSaveAction(submitterId: string): void {
    //Action based on submitter
    switch (submitterId) {
      case 'save_and_new':
        this._router.navigate(['secure/setting/organization', 'new'])
          .then(() => {
            window.location.reload();
          });
        break;

      case 'save_and_exit':
        this._router.navigate(['secure/setting/organization']);
        break;
    
      case 'save_and_continue':
      default:
        //Do nothing
        break;
    } //End switch
  } //function ends


  /**
   * Update form data
   */
  private fnFillData() {
    if (this.objContact && this.contactForm) {

      this.contactForm.patchValue({
        avatar: [ null ],
        first_name: this.objContact.first_name?this.objContact.first_name:'',
        middle_name: this.objContact.middle_name?this.objContact.middle_name:'',
        last_name: this.objContact.last_name?this.objContact.last_name:'',
        //phone_form_control: this.objContact.date_of_birth_at?this.objContact.date_of_birth_at:'',
        //company_id: [ null ],
        //dob_date_picker: [],
        date_of_birth_at: this.objContact.date_of_birth_at?this.objContact.date_of_birth_at:''
      });

    } //End if
  } //Function ends


  /**
   * Reset form
   */
  public fnResetForm(boolNavBack: boolean=false): void {
    this.contactForm.reset();

    if (boolNavBack) {
      this._router.navigate(['secure/setting/contact']);
    } //End if
  } //Function ends


  /**
   * Initialize Reactive Form
   */
  private fnInitializeForm() {
    this.contactForm = this._formBuilder.group({
      avatar: [ null ],
      first_name: [ '', [ Validators.required ]],
      middle_name: [ '' ],
      last_name: [ '', [ Validators.required ]],
      phone_form_control: [ '' ],
      company_id: [ null ],
      dob_date_picker: [],
      date_of_birth_at: [],
      gender_key: 'contact_gender_others',
      type_key: 'contact_type_default',
      language_code: 'en',
    });
  } //Function ends

} //Class ends
