import { Component, OnInit, Input } from '@angular/core';

//Application Libraries
import { IOrganization } from 'crmo-lib';
import { BaseComponent } from 'projects/crmo-backend/src/app/modules/base.component';

@Component({
  selector: 'crmo-backend-organization-configuration-list',
  templateUrl: './organization-configuration-list.component.html',
  styleUrls: ['./organization-configuration-list.component.scss']
})
export class OrganizationConfigurationListComponent extends BaseComponent implements OnInit {
  @Input('organization') objOrganization: IOrganization = null;
  @Input('configurations') objConfigurations = null;

  //Common attributes
  public boolLoading: boolean = false;


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
   * Initialize
   */
  private fnInitialize(): void {

  } //Function ends

} //Class ends
