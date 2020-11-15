import { Component, OnInit, Input, ViewChild } from '@angular/core';

//Application Libraries
import { IOrganization, IConfiguration } from 'crmo-lib';
import { BaseComponent } from 'projects/crmo-backend/src/app/modules/base.component';


@Component({
  selector: 'crmo-backend-organization-configuration-list',
  templateUrl: './organization-configuration-list.component.html',
  styleUrls: ['./organization-configuration-list.component.scss']
})
export class OrganizationConfigurationListComponent extends BaseComponent implements OnInit {
  @Input('organization') objOrganization: IOrganization = null;
  @Input('configurations') objConfigurations: IConfiguration[] = null;
   

  //Common attributes
  public boolLoading: boolean = false;
  public boolShowChild: boolean = false;

  public objSelectedConfiguration: IConfiguration = null;


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


  /**
   * Edit Data
   */
  public fnEditData(configuration: IConfiguration): void {
    this.objSelectedConfiguration = configuration;
    this.boolShowChild = true;
  } //Function ends


  /**
   * Delete Record
   */
  public fnDeleteRecord(configuration: IConfiguration): void {

  } //Function ends


  /**
   * Initialize
   */
  private fnInitialize(): void {

  } //Function ends

} //Class ends
