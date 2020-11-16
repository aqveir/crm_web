import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

//Application Modules
import { IResponseUserLogin, UserAuthService, IUserStatusResponse } from 'crmo-lib';

//Application Services
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { LayoutService } from '../../../../../core';
import { strict } from 'assert';

@Component({
  selector: 'app-user-dropdown-inner',
  templateUrl: './user-dropdown-inner.component.html',
  styleUrls: ['./user-dropdown-inner.component.scss'],
})
export class UserDropdownInnerComponent implements OnInit, OnDestroy {
  public extrasUserDropdownStyle: 'light' | 'dark' = 'light';
  public objUser: IResponseUserLogin;

  public keyUserStatus: string = 'user_status_offline';
  public langKeyUserStatus: string = 'MENU.AUTH_USER.USER_STATUS.USER_STATUS_OFFLINE';

  /**
   * Delaration of private variables
   */  
  private hwdTimeInternalId: any;


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _layout: LayoutService,
    private _userAuthService: UserAuthService
  ) {}


  /**
   * Lifecycle Hook's
   */
  ngOnInit(): void {
    this.extrasUserDropdownStyle = this._layout.getProp('extras.user.dropdown.style');
    this.objUser = this._globals.getClaim();

    this.hwdTimeInternalId = setInterval(() => {
      this.fnGetUpdatedHeaderData(); 
    }, 5000);
  } //Function ends
  ngOnDestroy(): void {
    //Kill Timer
    clearInterval(this.hwdTimeInternalId);
  }


  /**
   * Change password
   */
  public fnUserChangePasswordAction(): void {
    this._router.navigate(['/secure/user/change-password']);
  } //Function ends


  /**
   * Set the value for the User Status
   * 
   * @param event 
   */
  public fnUserStatusChangeAction(event: any): void {
    console.log(event?.target?.checked);

    //Set the changed user status
    let userStatus = (event?.target?.checked)?'user_status_online':'user_status_away';
    this._globals.setUserStatus(userStatus);

    //Stop event propogation
    event.stopPropagation();
  } //Function ends


  /**
   * User Logout
   */
  public fnUserLogoutAction(): void {

    //Raise the request to logout
    this._userAuthService.logout()
      .subscribe((response) => {
        //Clear session params
        this._globals.setClaim(null);

        //Navidate to my account page
        this._router.navigate(['/user/login']);
      },(() => {}));
  } //Function ends


  /**
   * Update the header data
   */
  private fnGetUpdatedHeaderData(): void {
    //Get the updated user status
    let userStatus: IUserStatusResponse = this._globals.getUserStatus();
    this.keyUserStatus = userStatus.status.key;

    //Update user status css class & lang key
    this.langKeyUserStatus = 'MENU.AUTH_USER.USER_STATUS.' + this.keyUserStatus.toUpperCase();

  } //Function ends

} //Class ends
