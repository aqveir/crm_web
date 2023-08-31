import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Application global files
import { Globals } from 'projects/crm-backend-web/src/app/app.global';
import { BaseComponent } from '../../../base.component';

//Application CRMO Library
import { IRequestUserLogin, IResponseUserLogin, UserAuthService } from 'crm-lib';
import { NotificationService } from 'common-lib';
import { environment } from '@env-backend/environment';


@Component({
  selector: 'crm-backend-login-partial',
  templateUrl: './login-partial.component.html',
  styleUrls: ['./login-partial.component.scss']
})
export class LoginPartialComponent extends BaseComponent implements OnInit {
  //Common attributes
  public isLoading: boolean = false;

  public loginForm!: FormGroup;
  public hasError: boolean = false;
  public pageAction: string = 'login-signin-on';


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _userAuthService: UserAuthService,
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
    //Load form
    this.fnInitializeForm();

    /**
     * 
     * 
     * TODO: Delete at prod rollout
     * 
     * 
     */
    if (!environment.production) {
      this.loginForm.patchValue({
        username: 'admin@ellaisys.com',
        password: 'Test@1234'
      });
    } //End if
  } //Function ends


  /**
   * Authenticate the User
   */
  public fnAuthenticateUserAction(): boolean {
    try {
      //Check form validity
      this.loginForm.updateValueAndValidity();
      if (this.loginForm.invalid) { 
        this.fnRaiseErrors(this.loginForm); 

        return false; 
      } //End if

      //Transform form data into request object
      let objFormData: IRequestUserLogin = this.loginForm.value;

      this.isLoading = true;
      this._userAuthService.login(objFormData)
        .subscribe((response: IResponseUserLogin) => {
          //Save the data into globals
          this._globals.setClaim(response);

          //Stop loader
          this.isLoading = false;

          //Load the application data
          this._globals.fnLoadApplicationData();

          //Navidate to my account page
          this._router.navigate(['/secure']);
        },(error) => {
          //Stop loader
          this.isLoading = false;

          throw error;
        });

        return true;
    } catch (error) {
      //Stop loader
      this.isLoading = false;

      throw error;
    } //Try-catch ends
  } //Function ends


  /**
   * Authenticate the User with Social login
   */
  public fnSocialAuthenticateUserAction(provider: string): void {
    try {
      this._notification.error('success', 'now it works');
    } catch(error) {

    } //Try-catch ends
  } //Function ends


  /**
   * Reset form
   */
  public fnResetForm(): void {
    this.loginForm.reset();
  } //Function ends


  /**
   * Initialize Reactive Form
   */
  private fnInitializeForm() {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(Globals._PASSWORD_POLICY.MIN_LENGTH), 
        Validators.maxLength(Globals._PASSWORD_POLICY.MAX_LENGTH), 
        Validators.pattern(Globals._PASSWORD_POLICY.REGEX_PATTERN)
      ]],
      remember_me: true,
      device_id: ['xxxx']
    });
  } //Function ends

} //Class ends
