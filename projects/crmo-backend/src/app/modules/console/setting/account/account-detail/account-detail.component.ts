import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../../base.component';

import { AccountService,IAccount,IAddress, ICountry, ILookup, ILookupValue } from 'crmo-lib';
import { AddressComponent } from '../../../shared/address/address.component';
import { ThrowStmt } from '@angular/compiler';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';


@Component({
  selector: 'crmo-backend-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent extends BaseComponent implements OnInit{

  //#region Public Variables

  public boolLoading: boolean = false;
  public boolSave: boolean = false;
  public hasError: boolean = false;
  public boolRefresh: boolean = false;
  public boolIsNew: boolean = false;
  public hash: string;
  
  public objAccount: IAccount;
  public objLookup:ILookup;
  public objCountryList:ILookupValue[];
  public accountDetailForm!: FormGroup;

  //#endregion

  //#region Private Variables

  private oHash:string;
  private accountHash:string;
  private acc_country:ICountry;

  //#endregion

  constructor(private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _accountService: AccountService
  ) { super(); }

  ngOnInit(): void {
    
    //Load all lookup values
    this.fnLoadLookupValues();

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

  /**
   * Get Data for the account from service
   */
   public fnLoadData(): boolean {
    try {

      let params: Object = {'key':this.oHash};

      //this.boolLoading = tggrue;

      this._accountService.getByHash(this.accountHash)
        .subscribe((response: IAccount) => {
          //Stop loader
          this.boolLoading = false;

          this.objAccount = response;
          //Full the form controls with data
          this.fnShowData();

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

  public fnChangeType(event: any):void{


  }

  /**
   * Populate data on Form 
   */
  private fnShowData(){
    this.accountDetailForm.patchValue({
      name:this.objAccount.name,
      description:this.objAccount.description,
      type:this.objAccount.type,
      owner:this.objAccount.owner,
      is_default:this.objAccount.is_default,
      address:this.objAccount.address,
      locality:this.objAccount.locality,
      city:this.objAccount.city,
      state:this.objAccount.state_id,
      country:this.objAccount.country,
      zipcode:this.objAccount.zipcode,
      website:this.objAccount.website,
      email:this.objAccount.email,
      phone:this.objAccount.phone

    });

  }

  /**
   * Reset form
   */
   public fnReset(boolNavBack: boolean=false): void {
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
    public fnSave(event: any): boolean {
      try {
        
        return true;
      } catch (error) {
       
        throw error;
      } //Try-catch ends
    } //Function ends

//#region Private functions

  /**
   * Initialize Reactive Form
   */
 private fnInitializeForm(): void {
  this.accountDetailForm = this._formBuilder.group({
    name: ['', [ Validators.required ]],
    hash: [{value: null, disabled: true}],
    description: [''],
    phone: [''],
    type: [''],
    website: ['', [ Validators.pattern(Globals._REGEX_PATTERN_UEL) ]],
    email: ['', [ Validators.required, Validators.email ]],
    owner:['',[Validators.required]],

    address: [''],
    locality: [''],
    city:[],
    state:[],
    country:[],
    zipcode:[],

    google_place_id:[],
    longitude:[],
    latitude:[],
    timezone:[],

    is_default: [true],
    is_active: [true],
    roles: this._formBuilder.array([]),
    privileges: ['']
  });
} //Function ends

private fnLoadLookupValues():void{

  try{
   //Load account type values
   this.objLookup = this._globals.getLookupByKey('account_type');
   this.objCountryList = (this.objLookup.values).filter((x: ILookupValue) => {
     return (
       (x.is_active==true) &&
       ((['data_type_string', 'data_type_json'].find((z: string) => {return z==x.key}))==null)
     )
   });
  }
  catch (error) {
    //Stop loader
    this.boolLoading = false;

    throw error;
  } //Try-catch ends
}

private fnLoadCountries():void{

  try{
   //TODO: API to Load countries from Country table is not yet available once its available 
  
  }
  catch (error) {
    //Stop loader
    this.boolLoading = false;

    throw error;
  } //Try-catch ends
}
//#endregion
}
