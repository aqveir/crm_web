import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../../base.component';

//Application Libraries
import { NotificationService } from 'ellaisys-lib';
import { IUser, IResponse, UserService } from 'crmo-lib';

@Component({
  selector: 'crmo-backend-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;

  public oHash: string;
  public objUser: IUser[];


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
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
    this.oHash = oHash; //this._globals.getAppParams().oHash;

    //Load form
    this.fnLoadData();

  } //Function ends


  /**
   * Get Data
   */
  public fnLoadData(): boolean {
    try {
      this.boolLoading = true;
      this._userService.getUsers(this.oHash)
        .subscribe((response: IUser[]) => {
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

} //Class ends
