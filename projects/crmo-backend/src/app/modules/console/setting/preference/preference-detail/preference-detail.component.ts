import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../../base.component';

//Application Libraries
import { EventBrokerService, NotificationService } from 'ellaisys-lib';
import { ILookup, ILookupValue, IPreference, IPreferenceDataValues, IPreferenceMinimal, IPreferenceRequest, PreferenceService } from 'crmo-lib';

@Component({
  selector: 'crmo-backend-preference-detail',
  templateUrl: './preference-detail.component.html',
  styleUrls: ['./preference-detail.component.scss']
})
export class PreferenceDetailComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;

  public oHash: string;
  public uuid: string;
  public objPreference: IPreference;
  public boolRefresh: boolean = false;
  
  public preferencesForm!: FormGroup;
  public preferencesDataForm!: FormGroup;
  public objLookup: ILookup;
  public listDataTypes: ILookupValue[];

  public strDataType: string = null;

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _preferenceService: PreferenceService,
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
    //Show Submenu
    this._broker.emit(Globals.EVENT_SHOW_SUBMENU, true);

    //Get params from the page route
    let oHash: string = this._route.snapshot.paramMap.get('ohash');
    let uuid: string = this._route.snapshot.paramMap.get('id');

    this.oHash = oHash;
    this.uuid = uuid;

    //Load form
    this.fnInitializeForm();

    //Load lookup values
    this.objLookup = this._globals.getLookupByKey('data_type');
    this.listDataTypes = (this.objLookup.values).filter((x: ILookupValue) => {
      return (
        (x.is_active==true) &&
        ((['data_type_string', 'data_type_json'].find((z: string) => {return z==x.key}))==null)
      )
    });

    //Create User Object
    if (uuid=='new') {
      this.fnCreateData();
    } else {
      //Load form
      this.fnLoadData();      
    } //End if

  } //Function ends

  
  /**
   * Create data
   */
  private fnCreateData(): IPreferenceRequest {
    return <IPreferenceRequest> {
      name: null,
      display_value: null,
      type_key: 'industry_type_vanilla'
    };
  } //Function ends
 
  
  /**
   * Get Data
   */
  public fnLoadData(): boolean {
    try {
      //Build the params for passing
      let params: Object = {'key': this.oHash};

      this.boolLoading = true;
      this._preferenceService.show(parseInt(this.uuid), params)
        .subscribe((response: IPreference) => {
          //Stop loader
          this.boolLoading = false;

          //Fill Data into variable
          this.objPreference = response;
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


  // public fnUpdateData(_objUser: IUser): boolean {
  //   try {
  //     this.boolRefresh = false;
  //     this.objPreference = _objUser;
  //     this.boolRefresh = true;
  //     return true;
  //   } catch (error) {
  //     throw error;
  //   } //Try-catch ends 
  // }

  
  
  /**
   * Save Data
   */
  public fnSaveAction(): boolean {
    try {
      //Check form validity
      this.preferencesForm.updateValueAndValidity();
      if (this.preferencesForm.invalid) { 
        this.fnRaiseErrors(this.preferencesForm); 

        return false; 
      } //End if

      return true;
    } catch (error) {
      //Stop loader
      this.boolLoading = false;

      throw error;
    } //Try-catch ends
  } //Function ends


  /**
   * Fill form data
   */
  private fnFillData(): void {
    if (this.objPreference && this.preferencesForm) {
      this.preferencesForm.patchValue({
        name: this.objPreference.name?this.objPreference.name:'',
        display_value: this.objPreference.display_value?this.objPreference.display_value:'',
        type_key: this.objPreference.type?this.objPreference.type?.key:'',
        column_name: this.objPreference.column_name?this.objPreference.column_name:'',
        keywords: this.objPreference.keywords?this.objPreference.keywords:'',
        order: this.objPreference.order?this.objPreference.order:0,
        is_active: this.objPreference.is_active?this.objPreference.is_active:true,
        is_minimum: this.objPreference.is_minimum?this.objPreference.is_minimum:false,
        is_maximum: this.objPreference.is_maximum?this.objPreference.is_maximum:false,
        is_multiple: this.objPreference.is_multiple?this.objPreference.is_multiple:false,
        //external_url:this.objPreference.external_url?this.objPreference.external_url:'',
      });

      //Set Data Type
      this.strDataType = this.objPreference.type?.key;

      //Enable-Disable some controls
      this.preferencesForm.controls['is_active'].enable();
      this.preferencesForm.controls['name'].disable();
      this.preferencesForm.controls['is_minimum'].disable();
      this.preferencesForm.controls['is_maximum'].disable();
      this.preferencesForm.controls['external_url'].disable();

      switch (this.strDataType) {
        case 'data_type_number':
          this.preferencesForm.controls['is_minimum'].enable();
          this.preferencesForm.controls['is_maximum'].enable();
          break;
  
        case 'data_type_lookup':
          //Create data form and set values
          this.preferencesDataForm = this.fnDataForm();
          this.preferencesForm.addControl('data', this.preferencesDataForm);
          this.preferencesForm.controls['data'].patchValue({
            id: (this.objPreference?.data)?(this.objPreference?.data.id):null,
            name: (this.objPreference?.data)?(this.objPreference?.data.name):null,
            display_value: (this.objPreference?.data)?(this.objPreference?.data.display_value):null,
            description: (this.objPreference?.data)?(this.objPreference?.data.description):null
          });

          //Total values into data collection
          let preferencesDataForm: FormGroup = this.preferencesForm.controls['data'] as FormGroup;
          let dataValues: IPreferenceDataValues[] = this.objPreference?.data?.values;
          let countValue: number = (dataValues)?(dataValues).length:0;
          for (let index = 0; index < countValue; index++) {
            let preferenceDataValuesForm: FormGroup = this.fnDataValueForm();
            preferenceDataValuesForm.patchValue({
              id: dataValues[index].id,
              value: dataValues[index].value,
              display_value: dataValues[index].display_value,
              description: dataValues[index].description,
              is_active: dataValues[index].is_active
            });

            //Push the data into FormArray
            (<FormArray>preferencesDataForm.controls['values']).push(preferenceDataValuesForm);
          } //Loop ends
          break;
      
        case 'data_type_external':
          this.preferencesForm.controls['external_url'].enable();
          break;

        default:
          break;
      } //End switch
    } //End if
  } //Function ends


  /**
   * Reset form
   */
  public fnResetForm(): void {
    this.preferencesForm.reset();
  } //Function ends


  /**
   * Manage the data type select change event
   * 
   * @param event 
   */
  public fnChangeDataType(event: any): void {
    //Reset the values
    this.preferencesForm.controls['is_minimum'].setValue(false);
    this.preferencesForm.controls['is_minimum'].disable();
    this.preferencesForm.controls['is_maximum'].setValue(false);
    this.preferencesForm.controls['is_maximum'].disable();
    this.preferencesForm.controls['external_url'].setValue('');
    this.preferencesForm.controls['external_url'].disable();
    this.strDataType = event?.key;

    if (this.preferencesForm.contains('data')) {
      this.preferencesForm.removeControl('data');        
    } //End if  

    switch (event?.key) {
      case 'data_type_number':
        this.preferencesForm.controls['is_minimum'].enable();
        this.preferencesForm.controls['is_maximum'].enable();
        break;

      case 'data_type_lookup':
        //Create data form and set values
        if (!this.preferencesForm.contains('data')) {
          this.preferencesDataForm = this.fnDataForm();
          this.preferencesForm.addControl('data', this.preferencesDataForm);          
        } //End if
        break;

      case 'data_type_external':
        this.preferencesForm.controls['external_url'].enable();
        break;
    
      default:
        break;
    } //End switch
  } //Function ends


  /**
   * Get Preference Data Values
   */
  public fnPreferencesDataValueForm(): FormGroup[] {
    let preferencesDataValues: FormArray = this.preferencesDataForm.controls['values'] as FormArray;
    return preferencesDataValues.controls as FormGroup[];
  } //Function ends


  /**
   * Add Value Form to the Preferences Form
   */
  public fnAddPreferenceDataValue(): void {
    try {
      //Add new data value form to the form array
      let preferenceDataValues = this.preferencesDataForm.controls.values as FormArray;
      preferenceDataValues.controls.push(this.fnDataValueForm());

      //Assign the value back
      this.preferencesDataForm.controls.values = preferenceDataValues;
    } catch (error) {
      throw error;
    } //Try-catch ends 
  } //FUnction ends


  /**
   * Remove the Data Value by Position Index
   * 
   * @param index 
   */
  public fnRemovePreferenceDataValue(index): void {
    try {
      let preferenceDataValues = this.preferencesDataForm.controls.values as FormArray;
      preferenceDataValues.removeAt(index);
    } catch (error) {
      throw error;
    } //Try-catch ends 
  } //Function ends


  /**
   * Initialize Reactive Form
   */
  private fnInitializeForm(): void {
    this.preferencesForm = this._formBuilder.group({
      name: ['', [ Validators.required ]],
      display_value: ['', [ Validators.required ]],
      column_name: [''],
      type_key: ['', [ Validators.required ]],
      keywords: [''],
      order: [0, [ Validators.min(0)]],
      is_active: [{value: true, disable: true}],
      is_minimum: [{value: false, disable: true}],
      is_maximum: [{value: false, disable: true}],
      is_multiple: [{value: false, disable: true}],
      external_url: [{value: '', disable: true}]
    });
  } //Function ends
  private fnDataForm(): FormGroup {
    return this._formBuilder.group({
      id: [0],
      name: ['', [ Validators.required ]],
      display_value: ['', [ Validators.required ]],
      description: [''],
      values: this._formBuilder.array([])
    });
  } //Function ends
  private fnDataValueForm(): FormGroup {
    return this._formBuilder.group({
      id: [0],
      value: [''],
      display_value: ['', [ Validators.required ]],
      description: [''],
      is_active: [true]
    });
  } //Function ends

} //Class ends
