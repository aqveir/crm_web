import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

//Application Modules
import { IResponseUserLogin, UserAuthService, IUserStatusResponse } from 'crm-lib';

//Application Services
import { Globals } from 'projects/crm-backend-web/src/app/app.global';
import { LayoutService } from '../../../../../core';



@Component({
  selector: 'app-user-offcanvas',
  templateUrl: './user-offcanvas.component.html',
  styleUrls: ['./user-offcanvas.component.scss'],
})
export class UserOffcanvasComponent implements OnInit {
  @Output('close') boolClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  public extrasUserOffcanvasDirection: string = 'offcanvas-right';
  public objUser: IResponseUserLogin|null = null;

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
    this.extrasUserOffcanvasDirection = `offcanvas-${this._layout.getProp('extras.user.offcanvas.direction')}`;
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
   * Close the Canvas
   * 
   * @param isDismiss 
   */
  public fnCloseCanvasAction(isDismiss: boolean=false): void {
    this.boolClose.emit(true);
  } //Fundtion ends


  /**
   * Update the header data
   */
  private fnGetUpdatedHeaderData(): void {
    //Get the updated user status
    let userStatus: IUserStatusResponse = this._globals.getUserStatus() as IUserStatusResponse;
    if (userStatus && userStatus.status) {
      this.keyUserStatus = userStatus.status.key;
    } //End if

    //Update user status css class & lang key
    this.langKeyUserStatus = 'MENU.AUTH_USER.USER_STATUS.' + this.keyUserStatus.toUpperCase();

  } //Function ends

} //Class ends
