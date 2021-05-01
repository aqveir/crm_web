import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from 'projects/crmo-backend/src/app/modules/base.component';

//Application Libraries
import { NotificationService } from 'ellaisys-lib';
import { IOrganization, ILookup, ILookupValue } from 'crmo-lib';


@Component({
  selector: 'crmo-backend-organization-data',
  templateUrl: './organization-data.component.html',
  styleUrls: ['./organization-data.component.scss']
})
export class OrganizationDataComponent extends BaseComponent implements OnInit {
  @Input('form') organizationDetailForm: FormGroup = null;
  @Input('organization') objOrganization: IOrganization = null;
  @Input('new') boolIsNew: boolean = false;
  @Input('refresh') boolRefresh: boolean = false;

  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;

  public objLookupIndustry: ILookup;
  public listLookupIndustryValues: ILookupValue[];
  

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
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
   * File control change event
   * 
   * @param event 
   */
  public fnFileUploadChangeEvent(event): void {
    try {
      let uploadedFile: File;

      if (event?.target?.files) {
        uploadedFile = event?.target?.files[0];
        this.organizationDetailForm.patchValue({
          logo: uploadedFile
        });
        console.log(uploadedFile);
      } //End if
    } catch(error) {
      throw error;
    } //Try-catch ends
  } //Function ends


  /**
   * Initialize
   */
  private fnInitialize(): void {
    //Load lookup values
    this.objLookupIndustry = this._globals.getLookupByKey('industry_type');
    if (this.objLookupIndustry) {
      this.listLookupIndustryValues = (this.objLookupIndustry?.values).filter((x: ILookupValue) => {return x.is_active==true});
    } //End if
  } //Function ends

} //Class ends

