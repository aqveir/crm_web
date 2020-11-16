import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

//Application Libraries
import { BaseComponent } from 'projects/crmo-backend/src/app/modules/base.component';
import { IConfiguration } from 'crmo-lib';

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

  //Common attributes
  public boolLoading: boolean = false;
  public objJsonData: JsonData[];


  /**
   * Default constructor
   */
  constructor() { super(); }



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
    } //End If
  } //Function ends

  /**
   * Initialize
   */
  private fnInitialize(): void {

  } //Function ends

} //Class ends
