import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Application libraries
import { IRequestUserForgotPassword, UserAuthService } from 'crm-lib';

//Application global files
import { Globals } from 'projects/crm-backend-web/src/app/app.global';
import { BaseComponent } from '../../../base.component';

@Component({
  selector: 'crm-backend-forgot-partial',
  templateUrl: './forgot-partial.component.html',
  styleUrls: ['./forgot-partial.component.scss']
})
export class ForgotPartialComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;

  public forgotPasswordForm!: FormGroup;
  public hasError: boolean=false;


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _userService: UserAuthService
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
    this.fnforgotPasswordForm();

  } //Function ends

  
  /**
   * On Submit Action
   */
  public fnOnSubmitAction(event: any) {
    try {
      //Check form validity
      this.forgotPasswordForm.updateValueAndValidity();
      if (this.forgotPasswordForm.invalid) { 
        this.fnRaiseErrors(this.forgotPasswordForm);
        return false; 
      } //End if

      let objforgotPasswordForm: IRequestUserForgotPassword = this.forgotPasswordForm.value;
      this.boolLoading = true;

      this._userService.forgot(objforgotPasswordForm)
        .subscribe((response: any) => {

          if (response && response==true) {
            //Show success notifocation msg
            this._globals.showSuccess('NOTIFICATION.USER_AUTH.FORGOT_PASSWORD.SUCCESS_MESSAGE', true);
          } else {
            //Show error notifocation msg
            this._globals.showError('NOTIFICATION.USER_AUTH.FORGOT_PASSWORD.ERROR_MESSAGE', true);
          } //End if

          //Stop loader
          this.boolLoading = false;

          //Redirect tologin page
          this._router.navigate(['user/login']);
        },() => {
          //Show error notifocation msg
          this._globals.showError('NOTIFICATION.USER_AUTH.FORGOT_PASSWORD.ERROR_MESSAGE', true);   
        });
        return true;
    } catch (error) {
      //Stop loader
      this.boolLoading = false;

      throw error;
    } //Try-catch ends
  } //Function ends


  /**
   * Reset form
   */
  public fnResetForm(): void {
    // this._logger.log('Your log message goes here');
    this.forgotPasswordForm.reset();
  } //Function ends


  /**
   * Login Reactive Form
   */
  private fnforgotPasswordForm() {
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [ Validators.required, Validators.email ]]
    });
  } //Function ends

} //Class ends
