import { Component, OnInit, Input } from '@angular/core';

//Application Libraries
import { BaseComponent } from 'projects/crmo-backend/src/app/modules/base.component';
import { IConfiguration } from 'crmo-lib';

@Component({
  selector: 'crmo-backend-organization-configuration-data',
  templateUrl: './organization-configuration-data.component.html',
  styleUrls: ['./organization-configuration-data.component.scss']
})
export class OrganizationConfigurationDataComponent extends BaseComponent implements OnInit {
  @Input('configuration') objConfiguration: IConfiguration = null;

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
