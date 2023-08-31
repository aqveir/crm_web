import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Application global files
import { Globals } from 'projects/crm-backend-web/src/app/app.global';
import { BaseComponent } from '../../../../base.component';

//Application Libraries
import { EventBrokerService, NotificationService } from 'common-lib';
import { OrganizationService, IOrganizationMinimal } from 'crm-lib';


@Component({
  selector: 'crm-backend-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;
  public objOrganization: IOrganizationMinimal[];
  public objRawData: IOrganizationMinimal[];

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _organizationService: OrganizationService,
    private _broker: EventBrokerService,
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
    //Load form
    this.fnLoadData();

  } //Function ends


  /**
   * Get Data for the Organization
   */
  public fnLoadData(): boolean {
    try {
      this.boolLoading = true;
      this._organizationService.get()
        .subscribe((response: IOrganizationMinimal[]) => {
          //Stop loader
          this.boolLoading = false;

          //Fill Data into variable
          this.objRawData = this.objOrganization = response;

          //Raise event to hide submenu
          this._broker.emit<boolean>(Globals.EVENT_SHOW_SUBMENU, false);
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
   * Show the Organization Details page
   * @param organization 
   */
  public fnSelectOrganization(organization: IOrganizationMinimal): boolean {
    let objReturnValue: boolean=false;
    try {
      this._router.navigate(['/secure/setting/organization', organization.hash]);
    } catch(error) {
      throw error;
    } //Try-catch ends

    return objReturnValue;
  } //Function ends


  /**
   * Filter data from the Search Bar
   * 
   * @param strSearch 
   */
  public fnFilterRecords(strSearch: string): void {
    this.objOrganization = this.fnFilterData(this.objRawData, strSearch);
  } //Function ends

} //Class ends
