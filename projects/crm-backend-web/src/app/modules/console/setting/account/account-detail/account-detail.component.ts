import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

//Application global files
import { Globals } from 'projects/crm-backend-web/src/app/app.global';
import { BaseComponent } from '../../../../base.component';

import { AccountService, IAccount, IAddress, ICountry, ILookup, ILookupValue, CountryService } from 'crm-lib';
//import { AddressComponent } from '../../../shared/address/address.component';
import { ThrowStmt } from '@angular/compiler';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { IAccountRequest } from 'projects/crmo-lib/src/public-api';


@Component({
  selector: 'crm-backend-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent extends BaseComponent implements OnInit {

  //#region Public Variables

  public boolLoading: boolean = false;
  public boolSave: boolean = false;
  public hasError: boolean = false;
  public boolRefresh: boolean = false;
  public boolIsNew: boolean = false;
  public hash: string;

  public objAccount: IAccount;
  public objLookup: ILookup;
  public objTypeList: ILookupValue[];
  public accountDetailForm!: FormGroup;
  public objCountryList: ICountry[];

  //#endregion

  //#region Private Variables

  private oHash: string;
  private accountHash: string;
  private accountPayload:IAccountRequest;
  private router: any;

  //#endregion

  //#region Constructors
  constructor(private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _accountService: AccountService,
    private _countryService: CountryService
  ) { super(); }

  //#endregion

  //#region Component Lifecycle Events

  ngOnInit(): void {

    //Load all lookup values
    this.fnLoadLookupValues();
    this.fnLoadCountries();

    //initialize the form
    this.fnInitializeForm();

    this.accountHash = this._route.snapshot.paramMap.get('key');
    this.oHash = this._route.snapshot.paramMap.get('ohash');

    //Create User Object
    if (this.accountHash) {
      //Load form
      this.fnLoadData();
    } //End if

  }

  //#endregion

  //#region Public Operations

  /**
   * Get Data for the account from service
   */
  public fnLoadData(): boolean {
    try {

      let params: Object = { 'key': this.oHash };

      //this.boolLoading = tggrue;

      this._accountService.getByHash(this.accountHash)
        .subscribe((response: IAccount) => {
          //Stop loader
          this.boolLoading = false;

          this.objAccount = response;
          //Full the form controls with data
          this.fnShowData();

        }, (error) => {
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
   * Get selected Account Type
   */
  public fnChangeType(event: any): void {

    console.log(this.accountDetailForm.controls['type'].value);
  }

  /**
    * Get selected country 
    */
  public fnChangeCountry(event: any): void {

    console.log(this.accountDetailForm.controls['country'].value);
  }

  /**
   * Reset form
   */
  public fnReset(boolNavBack: boolean = false): void {
    this.accountDetailForm.reset();

    if (boolNavBack) {
      this._router.navigate(['secure/setting/organization']);
    } //End if
  } //Function ends


  public fnReload(hash: string): void {
    this.hash = hash;
    this.fnLoadData();
  } //Function ends

  /**
   * Save Data
   */
  public fnSave(event: any): void {
    
    try {

      this.fnReadFormValues();      

      if(this.boolIsNew)
      {
      this._accountService.fnCreate(this.accountPayload)
        .subscribe((response: IAccount) => {
          
         //Show notification
         this._globals.showSuccess('NOTIFICATION.ACCOUNT_DETAILS.SUCCESS_MESSAGE', true);

         //Action based on submitter
         this.fnNextAction(event?.submitter?.id);

         //Stop loader
         this.boolSave = false;

        }, (error) => {
          //Stop loader
          this.boolLoading = false;

          throw error;
        });
      }
      else {
        this._accountService.fnUpdate(this.accountPayload)
        .subscribe((response: IAccount) => {
          
          //Show notification
          this._globals.showSuccess('NOTIFICATION.ACCOUNT_DETAILS.SUCCESS_MESSAGE', true);

          //Action based on submitter
          this.fnNextAction(event?.submitter?.id);

          //Stop loader
          this.boolSave = false;

        }, (error) => {
          //Stop loader
          this.boolLoading = false;

          throw error;
        });
      }
    } catch (error) {
      throw error;
    } //Try-catch ends
  } //Function ends

  //#endregion
  
  //#region Private functions

    /**
   * Populate data on Form 
   */
     private fnShowData() {
      this.accountDetailForm.patchValue({
        name: this.objAccount.name,
        description: this.objAccount.description,
        type: this.objAccount.type,
        owner: this.objAccount.owner,
        is_default: this.objAccount.is_default,
        address: this.objAccount.address,
        locality: this.objAccount.locality,
        city: this.objAccount.city,
        state: this.objAccount.state_id,
        country: this.objAccount.country,
        zipcode: this.objAccount.zipcode,
        website: this.objAccount.website,
        email: this.objAccount.email,
        phone: this.objAccount.phone
  
      });
  
    }

  /**
   * Action after Save based on which button is clicked
   * 
   * @param submitActionId
   */
   private fnNextAction(submitActionId: string): void {
    //Action based on submitter
    switch (submitActionId) {
      case 'save_and_new':
        this._router.navigate(['/secure/setting/organization', this.oHash, 'account', 'new'])
          .then(() => {
            window.location.reload();
          });
        break;

      case 'save_and_exit':
        this._router.navigate(['/secure/setting/account']);
        break;
    
      case 'save_and_continue':
      default:
        //Do nothing
        break;
    } //End switch
  } //function ends

  /**
   * Read form values for save 
   */
  private fnReadFormValues() {
    
    this.accountPayload.is_default = this.accountDetailForm.controls[''].value;
    this.accountPayload.name = this.accountDetailForm.controls['name'].value;
    this.accountPayload.description = this.accountDetailForm.controls['description'].value;
    this.accountPayload.email = this.accountDetailForm.controls['email'].value;
    this.accountPayload.phone = this.accountDetailForm.controls['phone'].value;
    this.accountPayload.website = this.accountDetailForm.controls['website'].value;
    this.accountPayload.owner = this.accountDetailForm.controls['owner'].value;
    this.accountPayload.address = this.accountDetailForm.controls['address'].value;
    this.accountPayload.city = this.accountDetailForm.controls['city'].value;
    this.accountPayload.state_id = this.accountDetailForm.controls['state'].value;
    this.accountPayload.country_alpha2_code = this.accountDetailForm.controls['country'].value;
    this.accountPayload.zipcode = this.accountDetailForm.controls['zipcode'].value;
    this.accountPayload.type_id = this.accountDetailForm.controls['type'].value;

    
  }

  /**
   * Initialize Reactive Form
   */
  private fnInitializeForm(): void {
    this.accountDetailForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      hash: [{ value: null, disabled: true }],
      description: [''],
      phone: [''],
      type: [''],
      website: ['', [Validators.pattern(Globals._REGEX_PATTERN_UEL)]],
      email: ['', [Validators.required, Validators.email]],
      owner: ['', [Validators.required]],

      address: [''],
      locality: [''],
      city: [],
      state: [],
      country: [''],
      zipcode: [],

      google_place_id: [],
      longitude: [],
      latitude: [],
      timezone: [],

      is_default: [true],
      is_active: [true],
      roles: this._formBuilder.array([]),
      privileges: ['']
    });
  } //Function ends

  /**
   * Load Accont Type dropdown
   */
  private fnLoadLookupValues(): void {

    try {
      //Load account type values
      this.objLookup = this._globals.getLookupByKey('account_type');
      this.objTypeList = (this.objLookup.values).filter((x: ILookupValue) => {
        return (
          (x.is_active == true) &&
          ((['data_type_string', 'data_type_json'].find((z: string) => { return z == x.key })) == null)
        )
      });
    }
    catch (error) {
      //Stop loader
      this.boolLoading = false;

      throw error;
    } //Try-catch ends
  }

  /**
   * Load country dropdown
   */
  private fnLoadCountries(): void {

    this._countryService.get()
      .subscribe((response: ICountry[]) => {
        //Stop loader
        this.boolLoading = false;

        this.objCountryList = response;
        //Full the form controls with data
        //this.fnShowData();

      }, (error) => {
        //Stop loader
        this.boolLoading = false;

        throw error;
      });
  }
  //#endregion
}
