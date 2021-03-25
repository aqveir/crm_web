import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from 'projects/crmo-backend/src/app/modules/base.component';

//Application Libraries
import { NotificationService } from 'ellaisys-lib';
import { OrganizationService, IOrganization, ILookup, ILookupValue } from 'crmo-lib';


@Component({
  selector: 'crmo-backend-organization-data',
  templateUrl: './organization-data.component.html',
  styleUrls: ['./organization-data.component.scss']
})
export class OrganizationDataComponent extends BaseComponent implements OnInit, OnChanges {
  @Input('organization') objOrganization: IOrganization = null;

  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;

  public organizationDetailForm!: FormGroup;
  public objLookupIndustry: ILookup;
  public listLookupIndustryValues: ILookupValue[];
  

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _organizationService: OrganizationService,
    private _notification : NotificationService
  ) { super(); }


  /**
   * Lifecycle Hook's
   */
  ngOnInit(): void {

    //Initilaize component
    this.fnInitialize();
  } //Function ends
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.objOrganization) {
      //Update data on form
      this.fnUpdateData();
    } //End if
  } //Function ends

  /**
   * Initialize
   */
  private fnInitialize(): void {
    //Load form
    this.fnInitializeForm();

    //Load lookup values
    this.objLookupIndustry = this._globals.getLookupByKey('industry_type');
    this.listLookupIndustryValues = (this.objLookupIndustry.values).filter((x: ILookupValue) => {return x.is_active==true});
  } //Function ends


  /**
   * Save Data
   */
  public fnSaveAction(): boolean {
    try {
      //Check form validity
      this.organizationDetailForm.updateValueAndValidity();
      if (this.organizationDetailForm.invalid) { 
        this.fnRaiseErrors(this.organizationDetailForm); 

        return false; 
      } //End if

      // let objFormData: RequestUserLogin = this.organizationDetailForm.value;
      // this.boolLoading = true;
      // // this._logger.log('Your log message goes here');
      // this._organizationService.update(objFormData)
      //   .subscribe((response: ResponseUserLogin) => {
      //     //Save the data into globals
      //     this._globals.setClaim(response);

      //     //Stop loader
      //     this.boolLoading = false;

      //     //Navidate to my account page
      //     this._router.navigate(['/secure']);
      //   },(error) => {
      //     //Stop loader
      //     this.boolLoading = false;

      //     //Show Error
      //     //this.hasError = true;

      //     throw error;
      //   });
        // .then ((response) => {
        //   // this._logger.log('Your log message goes here');
        //   // this._logger.debug("Your Debug message goes here");
        //   // this._logger.warn("Your Warning message goes here");

        //   // this._router.navigate(['home']);
        // })
        // .catch()
        // .finally();

        return true;
    } catch (error) {
      //Stop loader
      this.boolLoading = false;

      throw error;
    } //Try-catch ends
  } //Function ends


  /**
   * Update form data
   */
  private fnUpdateData() {
    if (this.objOrganization) {
      this.organizationDetailForm.patchValue({
        name: this.objOrganization.name?this.objOrganization.name:'',
        hash: this.objOrganization.hash?this.objOrganization.hash:'',
        logo: this.objOrganization.logo?this.objOrganization.logo:'',
        subdomain: this.objOrganization.subdomain?this.objOrganization.subdomain:'',
        industry_id:this.objOrganization.industry?(this.objOrganization.industry?.id):'',
        website: this.objOrganization.website?this.objOrganization.website:'',
        search_tag: this.objOrganization.search_tag?this.objOrganization.search_tag:'',

        contact_person_name: this.objOrganization.contact_person_name?this.objOrganization.contact_person_name:'',
        phone: this.objOrganization.phone?this.objOrganization.phone:'',
        email: this.objOrganization.email?this.objOrganization.email:'',
      });
    } //End if
  }  //Function ends


  /**
   * Reset form
   */
  public fnResetForm(): void {
    // this._logger.log('Your log message goes here');
    this.organizationDetailForm.reset();
  } //Function ends


  /**
   * Initialize Reactive Form
   */
  private fnInitializeForm() {
    this.organizationDetailForm = this._formBuilder.group({
      name: ['', [ Validators.required ]],
      hash: [{value: null, disabled: true}],
      logo: [''],
      subdomain: ['', [ Validators.required ]],
      industry_id: [''],
      website: ['', [Validators.pattern(Globals._REGEX_PATTERN_UEL)]],
      search_tag: [''],
      contact_person_name: [''],
      phone: [''],
      email: ['', [ Validators.email ]],
    });
  } //Function ends

} //Class ends

