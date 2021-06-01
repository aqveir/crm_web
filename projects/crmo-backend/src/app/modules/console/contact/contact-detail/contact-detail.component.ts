import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../base.component';

//Application Libraries
import { EventBrokerService, NotificationService } from 'ellaisys-lib';
import { ContactService, IContact } from 'crmo-lib';

@Component({
  selector: 'crmo-backend-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;

  public cHash: string;
  public objContact: IContact = null;
  public boolRefresh: boolean = false;
  public boolIsNew: boolean = false;
  public boolSaving: boolean = false;
  
  public contactForm!: FormGroup;

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
    let cHash: string = this._route.snapshot.paramMap.get('chash');
    this.cHash = cHash;

    //Initialize form
    this.fnInitializeForm();

    //Load page depending upon org hash
    if (cHash=='new') {
      this.fnCreateData();
    } else {
      //Load data for existing hash value
      this.fnLoadData();     
    } //End if

  } //Function ends
  

  /**
   * Create data
   */
  private fnCreateData(): void {
    //Set new flag
    this.boolIsNew = true;
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
    this._contactService.get(this.cHash)
      .subscribe((response: IContact) => {
        //Clear leading status
        this.boolLoading = false;

        let data: IContact = response;
        if (data) {
          this.objContact = data;
        } //End If
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
      if (this.boolIsNew) { //Create
        //New Organization
        this._contactService.create(dataUser)
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
      } else {
        //Update Organization
        this._contactService.update(this.cHash, dataUser)
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
      } //End if

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
      name: ['', [ Validators.required ]],
      hash: [{value: null, disabled: true}],
      logo: [{value: null, disabled: true}],
      subdomain: ['', [ Validators.required ]],
      industry_key: ['', [ Validators.required ]],
      website_protocal: ['http://'],
      website: ['', [ Validators.pattern(Globals._REGEX_PATTERN_UEL) ]],
      search_tag: [''],
      first_name: [''],
      last_name: [''],
      contact_person_name: ['', [ Validators.required ]],
      phone_form_control: [''],
      phone: [''],
      phone_idd: [''],
      email: ['', [ Validators.email ]],
    });
  } //Function ends

} //Class ends
