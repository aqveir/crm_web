import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../../base.component';

//Application Libraries
import { EventBrokerService, NotificationService } from 'ellaisys-lib';
import { IRole, IResponse, RoleService } from 'crmo-lib';

@Component({
  selector: 'crmo-backend-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;

  public oHash: string;
  public listRoles: IRole[];
  public objRawData: IRole[];


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
    private _roleService: RoleService,
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
      this._roleService.getAll(params)
        .subscribe((response: IRole[]) => {
          //Stop loader
          this.boolLoading = false;

          //Fill Data into variable
          this.objRawData = this.listRoles = response;

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
    this.listRoles = this.fnFilterData(this.objRawData, strSearch);
  } //Function ends

} //Class ends
