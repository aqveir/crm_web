import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';

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
  @Output('refresh') eventRefreshData: EventEmitter<boolean> = new EventEmitter<boolean>();
   

  //Common attributes
  public boolLoading: boolean = false;
  public boolShowConfigDetail: boolean = false;

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
    this.boolShowConfigDetail = true;
  } //Function ends


  /**
   * Delete Record
   */
  public fnDeleteRecord(configuration: IConfiguration): void {
    this.eventRefreshData.emit(true);
    event.stopPropagation();
  } //Function ends


  /**
   * Refresh Data
   */
  public fnRefreshData(): void {
    this.boolShowConfigDetail=false;
    this.eventRefreshData.emit(true);
  } //function ends


  /**
   * Initialize
   */
  private fnInitialize(): void {

  } //Function ends

} //Class ends
