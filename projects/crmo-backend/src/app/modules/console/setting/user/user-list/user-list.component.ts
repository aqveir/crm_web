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
  public listUsers: IUser[];

  private objRawData: IUser[];

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
      this._userService.getAll(params)
        .subscribe((response: IUser[]) => {
          //Stop loader
          this.boolLoading = false;

          //Fill Data into variable
          this.objRawData = this.listUsers = response;
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
    this.listUsers = this.fnFilterData(this.objRawData, strSearch);
  } //Function ends
} //Class ends
