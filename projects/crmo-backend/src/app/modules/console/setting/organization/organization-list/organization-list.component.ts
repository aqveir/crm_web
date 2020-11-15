import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../../base.component';

//Application Libraries
import { NotificationService } from 'ellaisys-lib';
import { OrganizationService, IOrganization, IResponse } from 'crmo-lib';


@Component({
  selector: 'crmo-backend-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;

  public objOrganization: IOrganization[];


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
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
    //Load form
    this.fnLoadData();

  } //Function ends


  /**
   * Get Data
   */
  public fnLoadData(): boolean {
    try {
      this.boolLoading = true;
      this._organizationService.get()
        .subscribe((response: IResponse) => {
          //Stop loader
          this.boolLoading = false;

          //Fill Data into variable
          this.objOrganization = response.data;
          console.log(response);

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

} //Class ends
