import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../../base.component';

//Application Libraries
import { EventBrokerService, NotificationService } from 'ellaisys-lib';
import { IRole, RoleService } from 'crmo-lib';

@Component({
  selector: 'crmo-backend-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;

  public oHash: string;
  public uuid: string;
  public objRole: any;
  public boolRefresh: boolean = false;


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
    private _roleService: RoleService,
    private _notification : NotificationService,
    private _broker: EventBrokerService
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
    //Show Submenu
    this._broker.emit(Globals.EVENT_SHOW_SUBMENU, true);

    //Get params from the page route
    let oHash: string = this._route.snapshot.paramMap.get('ohash');
    let uuid: string = this._route.snapshot.paramMap.get('uuid');

    this.oHash = oHash;
    this.uuid = uuid;

    //Create User Object
    if (uuid=='0') {
      this.fnCreateData();
    } else {
      //Load form
      this.fnLoadData();      
    } //End if

  } //Function ends

  
  /**
   * Create data
   */
  private fnCreateData(): void {
    this.objRole = {
      hash: null,
      avatar: null,
      username: null,
      first_name: null,
      last_name: null,
      email: null,
      phone: null,
      language: 'en',
      is_remote_access_only: false
    };
  } //Function ends
 
  
  /**
   * Get Data
   */
  public fnLoadData(): boolean {
    try {
      //Build the params for passing
      let params: Object = {'key': this.oHash};

      this.boolLoading = true;
      this._roleService.show(this.uuid, params)
        .subscribe((response: IRole) => {
          //Stop loader
          this.boolLoading = false;

          //Fill Data into variable
          this.objRole = response;
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


  // public fnUpdateData(_objUser: IUser): boolean {
  //   try {
  //     this.boolRefresh = false;
  //     this.objRole = _objUser;
  //     this.boolRefresh = true;
  //     return true;
  //   } catch (error) {
  //     throw error;
  //   } //Try-catch ends 
  // }


  public fnSaveData(event): boolean {
    try {
      this.boolRefresh = true;
      return true;
    } catch (error) {
      throw error;
    } //Try-catch ends 
  }

} //Class ends
