import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Application global files
import { Globals } from 'projects/crm-backend-web/src/app/app.global';
import { BaseComponent } from 'projects/crm-backend/src/app/modules/base.component';

//Application Libraries
import { NotificationService } from 'common-lib';
import { IOrganization, ILookup, ILookupValue } from 'crm-lib';


@Component({
  selector: 'crm-backend-organization-data',
  templateUrl: './organization-data.component.html',
  styleUrls: ['./organization-data.component.scss']
})
export class OrganizationDataComponent extends BaseComponent implements OnInit, OnChanges {
  @Input('form') organizationDetailForm: FormGroup = null;
  @Input('organization') objOrganization: IOrganization = null;
  @Input('new') boolIsNew: boolean = false;
  @Input('refresh') boolRefresh: boolean = false;

  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;

  public objLookupIndustry: ILookup;
  public listLookupIndustryValues: ILookupValue[];
  public imgOrganizationLogo: string = 'assets/media/organizations/logo-sample_200_200.png';
  

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
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.objOrganization) {
      let objOrganizationCurr: IOrganization =  changes.objOrganization.currentValue;
      this.imgOrganizationLogo = objOrganizationCurr?.logo;
    } //End if
  } //Function ends


  /**
   * File control change event
   * 
   * @param event 
   */
  public fnFileUploadChangeEvent(event: any): void {
    try {
      let uploadedFile: File;

      if (event?.target?.files && event.target.files[0]) {
        uploadedFile = event?.target?.files[0];

        //Check if the file object is valid
        if (uploadedFile) {
          //Read the file and assign to local variable
          const reader: FileReader = new FileReader();
          reader.readAsDataURL(uploadedFile);
          reader.onload = (evt) => {
            this.imgOrganizationLogo = evt.target.result as string; 
          };

          //Assign the value to form control
          this.organizationDetailForm.patchValue({
            logo: uploadedFile
          });
        } //End if

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

