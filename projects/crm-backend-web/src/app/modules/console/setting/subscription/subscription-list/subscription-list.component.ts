import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Application global files
import { Globals } from 'projects/crm-backend-web/src/app/app.global';
import { BaseComponent } from '../../../../base.component';

//Application Libraries
import { EventBrokerService, NotificationService } from 'common-lib';
import { IRole, IResponse, RoleService } from 'crm-lib';

@Component({
  selector: 'crm-backend-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;

  public oHash: string;
  public listSubscriptions: IRole[];
  public objRawData: IRole[];


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
    private _subscriptionService: RoleService,
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
    let oHash: string = this._route.snapshot.paramMap.get('ohash');
    this.oHash = oHash;

    //Load form
    this.fnLoadData();

  } //Function ends


  /**
   * Get Data
   */
  public fnLoadData(): boolean {
    try {
      //Build the params for passing
      let params: Object = {'key': this.oHash};

      this.boolLoading = true;
      this._subscriptionService.getAll(params)
        .subscribe((response: IRole[]) => {
          //Stop loader
          this.boolLoading = false;

          //Fill Data into variable
          this.objRawData = this.listSubscriptions = response;

          //Raise event to show submenu
          this._broker.emit<boolean>(Globals.EVENT_SHOW_SUBMENU, true);
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
   * Filter data from the Search Bar
   * 
   * @param strSearch 
   */
  public fnFilterRecords(strSearch: string): void {
    this.listSubscriptions = this.fnFilterData(this.objRawData, strSearch);
  } //Function ends

} //Class ends

