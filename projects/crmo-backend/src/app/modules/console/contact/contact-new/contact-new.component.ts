import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

//Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../base.component';
import KTWizard from '../../../../../assets/js/components/wizard';
import { KTUtil } from '../../../../../assets/js/components/util';

//Application Libraries
import { EventBrokerService, NotificationService } from 'ellaisys-lib';
import { ContactService, IContact } from 'crmo-lib';
import { OnDestroy } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'crmo-backend-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.scss']
})
export class ContactNewComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('wizardContactFormNew', { static: true }) wizardRef: ElementRef;
  
  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;

  public cHash: string;
  public objContact: IContact = null;
  public boolRefresh: boolean = false;
  public boolIsNew: boolean = false;
  public boolSaving: boolean = false;
  public contactForm!: FormGroup;

  private wizard: any;

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
  ngAfterViewInit(): void {
    //Initialize form wizard
    this.wizard = new KTWizard(this.wizardRef.nativeElement, { startStep: 1 });

    //Change event
    this.wizard.on('change', () => {
      setTimeout(() => { KTUtil.scrollTop(); }, 500);
    });
  } //Function ends
  ngOnDestroy(): void {
    this.wizard = undefined;
  } //Function ends


  /**
   * Initialize
   */
  private fnInitialize(): void {
    //Initialize form
    this.fnInitializeForm();

    this.fnCreateData();
  } //Function ends
  

  /**
   * Create data
   */
  private fnCreateData(): void {
    //Set new flag
    this.boolIsNew = true;

  } //Function ends


  /**
   * Next Step Action
   * 
   * @param event 
   */
  public fnNextStep(event: any): void {

    //Validate the form
    if (!this.fnValidateForm()) {

      //Shotp the wizard's step, as validation fails
      this.wizard.stop();
    } //End if
  } //Function ends
  

  /**
   * Save Data
   */
  public fnSaveAction(event: any): boolean {
    try {
      //Check form validity
      if (!this.fnValidateForm()) {  
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
          this._globals.showSuccess('NOTIFICATION.CONTACT_DETAILS.SUCCESS_MESSAGE', true);

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
      this._router.navigate(['secure/contact']);
    } //End if
  } //Function ends


  /**
   * Validate Form
   */
  private fnValidateForm(): boolean {
    try {
      //Check form validity
      this.contactForm.updateValueAndValidity();
      if (this.contactForm.invalid) {  
        let msgError: string = this.fnRaiseErrors(this.contactForm);

        return false;
      } //End if

      return true;
    } catch (error) {
      //Stop loader
      this.boolSaving = false;

      throw error;
    } //Try-catch ends

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
      details: this._formBuilder.array([])
    });
  } //Function ends

} //Class ends

