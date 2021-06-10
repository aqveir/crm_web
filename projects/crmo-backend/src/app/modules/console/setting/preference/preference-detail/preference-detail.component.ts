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
  public boolIsNew: boolean = false;
  
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
  private fnCreateData(): void {
    //Set new flag
    this.boolIsNew = true;

    if (this.preferencesForm) { 
      //Enable-Disable some controls
      this.preferencesForm.controls['is_active'].disable();
      this.preferencesForm.controls['name'].enable();
      this.preferencesForm.controls['is_multiple'].disable();
      this.preferencesForm.controls['is_minimum'].disable();
      this.preferencesForm.controls['is_maximum'].disable();
      this.preferencesForm.controls['external_url'].disable();
    } //End if
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
  
  
  /**
   * Save Data
   */
  public fnSaveAction(event: any): boolean {
    try {
      //Check form validity
      this.preferencesForm.updateValueAndValidity();
      if (this.preferencesForm.invalid) { 
        let msgError: string = this.fnRaiseErrors(this.preferencesForm); 
        this._notification.error('Error', msgError);
        return false; 
      } //End if

      //Build the params for passing
      let params: Object = {'key': this.oHash};

      //Set form value to request object
      let dataPreference: IPreferenceRequest = this.preferencesForm.value;

      this.boolLoading = true;
      if (this.boolIsNew) {
        this._preferenceService.create(dataPreference, params)
        .subscribe((response: any) => {
          //Show notification
          this._globals.showSuccess('NOTIFICATION.USER_DETAILS.SUCCESS_MESSAGE', true);

          //Action based on submitter
          this.fnPostSaveAction(event?.submitter?.id);

          //Stop loader
          this.boolLoading = false;
        },(error) => {
          //Stop loader
          this.boolLoading = false;
          throw error;
        });
      } else {
        this._preferenceService.update(parseInt(this.uuid), dataPreference, params)
        .subscribe((response: any) => {
          //Show notification
          this._globals.showSuccess('NOTIFICATION.USER_DETAILS.SUCCESS_MESSAGE', true);

          //Action based on submitter
          this.fnPostSaveAction(event?.submitter?.id);

          //Stop loader
          this.boolLoading = false;
        },(error) => {
          //Stop loader
          this.boolLoading = false;
          throw error;
        });
      } //End if

      return true;
    } catch (error) {
      //Stop loader
      this.boolLoading = false;

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
        this._router.navigate(['secure/setting/organization', this.oHash, 'preference', 'new'])
          .then(() => {
            window.location.reload();
          });
        break;

      case 'save_and_exit':
        this._router.navigate(['secure/setting/organization', this.oHash, 'preference']);
        break;
    
      case 'save_and_continue':
      default:
        //Do nothing
        break;
    } //End switch
  } //function ends


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
        external_url:this.objPreference.external_url?this.objPreference.external_url:'',
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
  public fnResetForm(boolNavBack: boolean=false): void {
    this.preferencesForm.reset();

 
    if (boolNavBack) {
      this._router.navigate(['secure/setting/organization', this.oHash, 'preference' ]);
    } //End if
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
        this.preferencesForm.controls['is_multiple'].enable();
        break;

      case 'data_type_lookup':
        //Create data form and set values
        if (!this.preferencesForm.contains('data')) {
          this.preferencesDataForm = this.fnDataForm();
          this.preferencesForm.addControl('data', this.preferencesDataForm);          
        } //End if
        this.preferencesForm.controls['is_multiple'].enable();
        break;

      case 'data_type_external':
        this.preferencesForm.controls['external_url'].enable();
        this.preferencesForm.controls['is_multiple'].enable();
        break;
    
      default:
        this.preferencesForm.controls['is_multiple'].disable();
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
      type_key: ['data_type_boolean', [ Validators.required ]],
      keywords: ['', [ Validators.required ]],
      order: [0, [ Validators.min(0)]],
      is_active: [ true ],
      is_minimum: [ false ],
      is_maximum: [ false ],
      is_multiple: [ false ],
      external_url: ['']
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
      value: ['', [ Validators.required ]],
      display_value: ['', [ Validators.required ]],
      description: [''],
      is_active: [true]
    });
  } //Function ends

} //Class ends
