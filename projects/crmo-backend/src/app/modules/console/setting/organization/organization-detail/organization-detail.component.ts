import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../../base.component';

//Application Libraries
import { EventBrokerService, NotificationService } from 'ellaisys-lib';
import { OrganizationService, IOrganization, IResponse } from 'crmo-lib';


@Component({
  selector: 'crmo-backend-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss']
})
export class OrganizationDetailComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;
  public boolSaving: boolean = false;
  public hasError: boolean = false;

  public oHash: string;
  public objOrganization: IOrganization;
  public boolRefresh: boolean = false;
  public boolIsNew: boolean = false;
  
  public organizationForm!: FormGroup;
  

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _organizationService: OrganizationService,
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
    let oHash: string = this._route.snapshot.paramMap.get('ohash');
    this.oHash = oHash;

    //Initialize form
    this.fnInitializeForm();

    //Load page depending upon org hash
    if (oHash=='new') {
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
   * Get Data
   */
  public fnLoadData(): boolean {
    try {
      //Build the params for passing
      let params: Object = {'key': this.oHash};

      this.boolLoading = true;
      this._organizationService.show(this.oHash, params)
        .subscribe((response: IOrganization) => {
          //Stop loader
          this.boolLoading = false;

          //Update Setting Information
          this._globals.updateSettingInfo('selected_oHash', this.oHash);

          //Raise event to show submenu
          this._broker.emit<boolean>(Globals.EVENT_SHOW_SUBMENU, true);

          //Set param
          this.objOrganization = response;

          //Full the form controls with data
          this.fnFillData();
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
   * Refresh Organization Data
   */
  public fnRefreshOrganizationData(oHash: string): void {
    this.oHash = oHash;
    this.fnLoadData();
  } //Function ends
  

  /**
   * Save Data
   */
  public fnSaveAction(event: any): boolean {
    try {
      //Process Phone values
      let controlPhoneData: any = this.organizationForm.controls['phone_form_control'].value;
      if (controlPhoneData && controlPhoneData['number'] && controlPhoneData['number'].length>0) {
        this.organizationForm.patchValue({
          phone: controlPhoneData['number'],
          phone_idd: controlPhoneData['iddCode'],
        });
      } else {
        this.organizationForm.controls['phone'].disable();
        this.organizationForm.controls['phone_idd'].disable();
      } //End if

      //Process Website URL values
      let controlWebsiteData: any = this.organizationForm.controls['website'].value;
      if (controlWebsiteData) {
        let controlWebsiteProtocalData: any = this.organizationForm.controls['website_protocal'].value;
        controlWebsiteData = controlWebsiteProtocalData + controlWebsiteData;
        this.organizationForm.patchValue({
          website: controlWebsiteData
        });
      } //End if

      //Split Contact Name into First/Last for New Organization
      if (this.boolIsNew) {
        let strContactName: string = this.organizationForm.controls['contact_person_name'].value;
        if (strContactName && strContactName.length>0) {
          let posFirstSpace: number = strContactName.indexOf(' ', 0);
          let firstName: string = strContactName.substring(0, posFirstSpace);
          let lastName: string = strContactName.substring((posFirstSpace+1), strContactName.length);

          this.organizationForm.patchValue({
            first_name: firstName,
            last_name: lastName
          });
        } //End if
      } //End if

      //Check form validity
      this.organizationForm.updateValueAndValidity();
      if (this.organizationForm.invalid) {  
        let msgError: string = this.fnRaiseErrors(this.organizationForm);
        this._notification.error('Error', msgError);
        return false;
      } //End if

      //Set form value to request object (transform to FormData)
      let dataUser: any = this.fnTransformReactiveFormGroup2FormData(this.organizationForm);

      this.boolSaving=true;
      if (this.boolIsNew) { //Create
        //New Organization
        this._organizationService.create(dataUser)
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
        //Build the params for passing
        let params: Object = {'key': this.oHash};

        //Update Organization
        this._organizationService.update(this.oHash, dataUser, params)
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
   * Update form data
   */
  private fnFillData() {
    if (this.objOrganization && this.organizationForm) {
      //website protocal
      let strWebsiteProtocal: string = ((this.objOrganization.website?.indexOf('https'))<0)?'http://':'https://';
      let strWebsiteURL: string = (this.objOrganization.website)?this.objOrganization.website?.replace(strWebsiteProtocal, ''):'';

      this.organizationForm.patchValue({
        name: this.objOrganization.name?this.objOrganization.name:'',
        hash: this.objOrganization.hash?this.objOrganization.hash:'',
        subdomain: this.objOrganization.subdomain?this.objOrganization.subdomain:'',
        industry_key:this.objOrganization.industry?(this.objOrganization.industry?.key):'',
        website_protocal: strWebsiteProtocal,
        website: strWebsiteURL,
        search_tag: this.objOrganization.search_tag?this.objOrganization.search_tag:'',

        contact_person_name: this.objOrganization.contact_person_name?this.objOrganization.contact_person_name:'',
        phone: this.objOrganization.phone?this.objOrganization.phone:'',
        email: this.objOrganization.email?this.objOrganization.email:'',
      });

      //Enable-Disable Controls
      this.organizationForm.controls['first_name'].disable();
      this.organizationForm.controls['last_name'].disable();
      this.organizationForm.controls['logo'].enable();
    } //End if
  }  //Function ends


  /**
   * Reset form
   */
  public fnResetForm(boolNavBack: boolean=false): void {
    this.organizationForm.reset();

    if (boolNavBack) {
      this._router.navigate(['secure/setting/organization']);
    } //End if
  } //Function ends


  /**
   * Initialize Reactive Form
   */
  private fnInitializeForm() {
    this.organizationForm = this._formBuilder.group({
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
