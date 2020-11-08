import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../../base.component';

//Application Libraries
import { NotificationService } from 'ellaisys-lib';
import { OrganizationService, IOrganization, IResponse } from 'crmo-lib';


@Component({
  selector: 'crmo-backend-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss']
})
export class OrganizationDetailComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;

  public objOrganization: IOrganization;
  public organizationDetailForm!: FormGroup;
  public hasError: boolean = false;


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
  

  /**
   * Initialize
   */
  private fnInitialize(): void {
    let ohash: string = this._route.snapshot.paramMap.get('ohash');

    //Load form
    this.fnInitializeForm();    

    //Fetch Data
    this.fnShowData(ohash);

  } //Function ends


  /**
   * Get Data
   */
  public fnShowData(oHash: string): boolean {
    try {
      this.boolLoading = true;
      this._organizationService.show(oHash)
        .subscribe((response: IResponse) => {
          //Stop loader
          this.boolLoading = false;

          //Set param
          this.objOrganization = response.data;          

          //Fill Data into forms
          this.fnUpdateData();

          console.log(response);

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


  // /**
  //  * Save Data
  //  */
  // public fnSaveAction(): boolean {
  //   try {
  //     //Check form validity
  //     this.organizationDetailForm.updateValueAndValidity();
  //     if (this.organizationDetailForm.invalid) { 
  //       this.fnRaiseErrors(this.organizationDetailForm); 

  //       return false; 
  //     } //End if

  //     let objFormData: RequestUserLogin = this.organizationDetailForm.value;
  //     this.boolLoading = true;
  //     // this._logger.log('Your log message goes here');
  //     this._organizationService.update(objFormData)
  //       .subscribe((response: ResponseUserLogin) => {
  //         //Save the data into globals
  //         this._globals.setClaim(response);

  //         //Stop loader
  //         this.boolLoading = false;

  //         //Navidate to my account page
  //         this._router.navigate(['/secure']);
  //       },(error) => {
  //         //Stop loader
  //         this.boolLoading = false;

  //         //Show Error
  //         //this.hasError = true;

  //         throw error;
  //       });
  //       // .then ((response) => {
  //       //   // this._logger.log('Your log message goes here');
  //       //   // this._logger.debug("Your Debug message goes here");
  //       //   // this._logger.warn("Your Warning message goes here");

  //       //   // this._router.navigate(['home']);
  //       // })
  //       // .catch()
  //       // .finally();

  //       return true;
  //   } catch (error) {
  //     //Stop loader
  //     this.boolLoading = false;

  //     throw error;
  //   } //Try-catch ends
  // } //Function ends



  /**
   * Navigate back
   */
  public fnNavigateBack(): void {
    try {
      this._notification.error('success', 'now it works');
    } catch(error) {

    } //Try-catch ends
  } //Function ends
  

  /**
   * Reset form
   */
  public fnResetForm(): void {
    // this._logger.log('Your log message goes here');
    this.organizationDetailForm.reset();
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
        sub_domain: this.objOrganization.sub_domain?this.objOrganization.sub_domain:'',
        website: this.objOrganization.website?this.objOrganization.website:'',
        search_tag: this.objOrganization.search_tag?this.objOrganization.search_tag:'',

        contact_person_name: this.objOrganization.contact_person_name?this.objOrganization.contact_person_name:'',
        contact_phone: this.objOrganization.contact_phone?this.objOrganization.contact_phone:'',
        contact_email: this.objOrganization.contact_email?this.objOrganization.contact_email:'',
      });
    } //End if
  }  //Function ends


  /**
   * Initialize Reactive Form
   */
  private fnInitializeForm() {
    this.organizationDetailForm = this._formBuilder.group({
      name: ['', [ Validators.required ]],
      hash: [{value: null, disabled: true}],
      logo: [''],
      sub_domain: ['', [ Validators.required ]],
      website: [''],
      search_tag: [''],
      contact_person_name: [''],
      contact_phone: [''],
      contact_email: ['', [ Validators.email ]],
    });
  } //Function ends

} //Class ends
