import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../../base.component';

//Application Libraries
import { EventBrokerService, NotificationService } from 'ellaisys-lib';
import { IUser, IResponse, UserService } from 'crmo-lib';

@Component({
  selector: 'crmo-backend-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;

  public oHash: string;
  public uhash: string;
  public objUser: any;
  public boolRefresh: boolean = false;


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
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
    let uHash: string = this._route.snapshot.paramMap.get('uhash');

    this.oHash = oHash;
    this.uhash = uHash;

    //Create User Object
    if (uHash=='0') {
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
    this.objUser = {
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
      this.boolLoading = true;
      this._userService.getUserByIdentifier(this.oHash, this.uhash)
        .subscribe((response: IUser) => {
          //Stop loader
          this.boolLoading = false;

          //Fill Data into variable
          this.objUser = response;
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


  public fnUpdateData(_objUser: IUser): boolean {
    try {
      this.boolRefresh = false;
      this.objUser = _objUser;
      this.boolRefresh = true;
      return true;
    } catch (error) {
      throw error;
    } //Try-catch ends 
  }


  public fnSaveData(event): boolean {
    try {
      this.boolRefresh = true;
      return true;
    } catch (error) {
      throw error;
    } //Try-catch ends 
  }

} //Class ends
