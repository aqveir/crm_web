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
  public hasError: boolean = false;

  public oHash: string;
  public objOrganization: IOrganization;
  

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
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
    let oHash: string = this._route.snapshot.paramMap.get('ohash');
    this.oHash = oHash;

    //Load data for existing hash value
    if (oHash!='new') {
      //Fetch Data
      this.fnShowData(oHash);      
    } //End if

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
   * Refresh Organization Data
   */
  public fnRefreshOrganizationData(oHash: string): void {
    this.fnShowData(this.oHash);
  } //Function ends


  /**
   * Navigate back
   */
  public fnNavigateBack(): void {
    try {
      this._notification.error('success', 'now it works');
    } catch(error) {

    } //Try-catch ends
  } //Function ends

} //Class ends
