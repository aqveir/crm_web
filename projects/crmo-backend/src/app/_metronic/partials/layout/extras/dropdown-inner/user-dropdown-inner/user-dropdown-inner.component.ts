import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Application Modules
import { ResponseUserLogin, UserAuthService } from 'crmo-lib';

//Application Services
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { LayoutService } from '../../../../../core';

@Component({
  selector: 'app-user-dropdown-inner',
  templateUrl: './user-dropdown-inner.component.html',
  styleUrls: ['./user-dropdown-inner.component.scss'],
})
export class UserDropdownInnerComponent implements OnInit {
  public extrasUserDropdownStyle: 'light' | 'dark' = 'light';
  public objUser: ResponseUserLogin;


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
  } //Function ends


  /**
   * Change password
   */
  public fnUserChangePasswordAction(): void {
    this._router.navigate(['/secure/user/change-password']);
  } //Function ends


  /**
   * User Logout
   */
  public fnUserLogoutAction(): void {

    //Raise the request to logout
    this._userAuthService.logout()
      .subscribe((response) => {
          //Navidate to my account page
          this._router.navigate(['/user/login']);
      },(() => {}));
  } //Function ends

} //Class ends
