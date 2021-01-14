import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

//Application Libraries
import { BaseComponent } from 'projects/crmo-backend/src/app/modules/base.component';
import { IConfiguration } from 'crmo-lib';


import { Globals } from 'projects/crmo-backend/src/app/app.global';

//Language Interface
class JsonData {
  key: string;
  value: string;
  display_value: string;
} //Interface ends

@Component({
  selector: 'crmo-backend-organization-configuration-data',
  templateUrl: './organization-configuration-data.component.html',
  styleUrls: ['./organization-configuration-data.component.scss']
})
export class OrganizationConfigurationDataComponent extends BaseComponent implements OnInit, OnChanges {
  @Input('configuration') objConfiguration: IConfiguration = null;
  @Output('saved') eventSaved: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('cancelled') eventCancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  //Common attributes
  public boolLoading: boolean = false;
  public objJsonData: JsonData[];

  public frmOrgConfigData!: FormGroup;


  /**
   * Default constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
  ) { super(); }



  /**
   * Lifecycle Hook's
   */
  ngOnInit(): void {

    //Initilaize component
    this.fnInitialize();
  } //Function ends
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.objConfiguration) {
      if (changes.objConfiguration.currentValue.type.key === 'data_type_json') {
        let data: string = changes.objConfiguration.currentValue.pivot.value;
        let objJsonData: Object = (data)?JSON.parse(data):(changes.objConfiguration.currentValue.schema);

        //Reset the params
        this.objJsonData = [];

        //Iterate the keys
        for (let key in objJsonData) {
          let item: JsonData = new JsonData();
          item.key = key;
          item.value = objJsonData[key];
          item.display_value = key.replace(/_/gi, ' ',);

          this.objJsonData.push(item);
        } //Loop ends
      } //End if

      //Build form
      this.fnInitializeForm();
    } //End If
  } //Function ends

  /**
   * Initialize
   */
  private fnInitialize(): void {

  } //Function ends



  public fnSaveAction() {
    this.eventSaved.emit(true);
  }

  public fnBackAction() {
    this.eventCancel.emit(true);
  }


  /**
   * Initialize Reactive Form
   */
  private fnInitializeForm() {
    switch (this.objConfiguration.type.key) {
      case 'data_type_json':
        this.frmOrgConfigData = this.fnBuildJsonDataForm();
        break;

      case 'data_type_string':
      case 'data_type_number':
      default:
        let control: any = {};
        let valueDefault: string = (this.objConfiguration?.pivot?.value)?this.objConfiguration.pivot.value:'';
        control[this.objConfiguration.key] = new FormControl(valueDefault, Validators.required);
        this.frmOrgConfigData = this._formBuilder.group(control);
        break;
    }
  } //Function ends


  /**
   * Build the Dynamic Form
   */
  private fnBuildJsonDataForm(): FormGroup {
    let control: any  = {};

    this.objJsonData.forEach(item => {
      let valueDefault: string = (item?.value)?item.value:'';
      control[item.key] = new FormControl(valueDefault, Validators.required);
    });

    return new FormGroup(control);
  } //Function ends

} //Class ends
