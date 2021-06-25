import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Application libraries
import { IRequestUserResetPassword, UserAuthService } from 'crmo-lib';
import { ConfirmPasswordValidator } from 'ellaisys-lib';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../base.component';

@Component({
  selector: 'crmo-backend-reset-partial',
  templateUrl: './reset-partial.component.html',
  styleUrls: ['./reset-partial.component.scss']
})
export class ResetPartialComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;

  public resetPasswordForm!: FormGroup;
  public hasError: boolean=false;

  private token: string = null;
  private email: string = null;


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
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
    //Get token from URL path
    this.token = this._route.snapshot.paramMap.get('token');

    //Get email from URL params
    this.email = this._route.snapshot.queryParamMap.get('email');

    //Load form
    this.fnforgotPasswordForm();

    //Fill data
    this.fnFillData();
  } //Function ends


  /**
   * Fill form data
   */
  private fnFillData() {
    if (this.resetPasswordForm) {
      this.resetPasswordForm.patchValue({
        token: this.token!='none'?this.token:'',
        email: this.email
      }, {emitEvent: true});
    } //End if
  } //Function ends

  
  /**
   * On Submit Action
   */
  public fnOnSubmitAction(event: any) {
    try {
      //Check form validity
      this.resetPasswordForm.updateValueAndValidity();
      if (this.resetPasswordForm.invalid) { 
        this.fnRaiseErrors(this.resetPasswordForm);
        return false; 
      } //End if

      //Transform form into object
      let objresetPasswordForm: IRequestUserResetPassword = this.resetPasswordForm.value;

      this.boolLoading = true;
      this._userService.reset(objresetPasswordForm)
        .subscribe((response: any) => {

          if (response && response==true) {
            //Show success notifocation msg
            this._globals.showSuccess('NOTIFICATION.USER_AUTH.RESET_PASSWORD.SUCCESS_MESSAGE', true);
          } else {
            //Show error notifocation msg
            this._globals.showError('NOTIFICATION.USER_AUTH.RESET_PASSWORD.ERROR_MESSAGE', true);
          } //End if

          //Stop loader
          this.boolLoading = false;

          //Redirect tologin page
          this._router.navigate(['user/login']);
        },(error: any) => {
          let msgErrorCode: string ='NOTIFICATION.USER_AUTH.RESET_PASSWORD.ERROR_MESSAGE';
          if (error?.error?.data && (error.error.data?.length>0)) {
            msgErrorCode = error.error.data[0];
          } //End if

          //Show error notifocation msg
          this._globals.showError(msgErrorCode, true);

          //Stop loader
          this.boolLoading = false;
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
    this.resetPasswordForm.reset();
  } //Function ends


  /**
   * Login Reactive Form
   */
  private fnforgotPasswordForm() {
    this.resetPasswordForm = this._formBuilder.group({
      token: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(Globals._PASSWORD_POLICY.MIN_LENGTH), 
        Validators.maxLength(Globals._PASSWORD_POLICY.MAX_LENGTH), 
        Validators.pattern(Globals._PASSWORD_POLICY.REGEX_PATTERN)
      ]],
      password_confirmation: ['', [ Validators.required, ConfirmPasswordValidator('password')]]
    });
  } //Function ends

} //Class ends
