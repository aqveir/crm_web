import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

//Third Party components and libraries
import moment from 'moment';
import { NgbActiveModal, NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from 'projects/crmo-backend/src/app/modules/base.component';

//Application Libraries
import { NotificationService } from 'common-lib';
import { IOrganization, ILookup, ILookupValue } from 'crmo-lib';


@Component({
  selector: 'crmo-backend-tab-setting-new-contact',
  templateUrl: './tab-setting-new-contact.component.html',
  styleUrls: ['./tab-setting-new-contact.component.scss']
})
export class TabSettingNewContactComponent extends BaseComponent implements OnInit {
  @Input('form') contactForm: FormGroup = null;

  //Common attributes
  public boolLoadingPage: boolean = false;
  public boolLoading: boolean = false;
  public boolSaving: boolean = false;
  public hasError: boolean = false;

  public listCompany: any;
  public listCompanyRole: any[] = ['CXO', 'Executive'];
  public listLookupGroup: ILookupValue[];
  public listLookupType: ILookupValue[];
  public listLookupStatus: ILookupValue[];
  public listLanguage: any[];
  

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _cd: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _notification : NotificationService,
  ) { super(); 
  
  }


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
    //Loading Page
    this.boolLoadingPage=true;

    //Load lookup values - Contact Group
    let objContactGroup = this._globals.getLookupByKey('contact_group');
    if (objContactGroup) {
      this.listLookupGroup = (objContactGroup?.values).filter((x: ILookupValue) => {return x.is_active==true});
    } //End if

    //Load lookup values - Contact type
    let objContactTypes = this._globals.getLookupByKey('contact_type');
    if (objContactTypes) {
      this.listLookupType = (objContactTypes?.values).filter((x: ILookupValue) => {return x.is_active==true});
    } //End if

    //Load lookup values - Contact Status
    let objContactStatuses = this._globals.getLookupByKey('contact_group');
    if (objContactStatuses) {
      this.listLookupStatus = (objContactStatuses?.values).filter((x: ILookupValue) => {return x.is_active==true});
    } //End if

    //Load Language values
    this.listLanguage = Globals._LANGUAGES;



    
    //this._cd.detach();
    setTimeout(() => {

      //Page loaded completely
      this.boolLoadingPage=false;
    },0)
  } //Function ends

} //Class ends


