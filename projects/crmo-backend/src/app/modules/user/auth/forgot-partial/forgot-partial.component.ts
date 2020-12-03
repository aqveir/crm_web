import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'crmo-backend-forgot-partial',
  templateUrl: './forgot-partial.component.html',
  styleUrls: ['./forgot-partial.component.scss']
})
export class ForgotPartialComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;

  public forgotPasswordForm!: FormGroup;
  public hasError: boolean=false;
  public pageAction: string = 'login-signin-on';


  /**
   * Default constructor
   */
  constructor(
    //private _globals: Globals,
    private _router: Router,
    private _formBuilder: FormBuilder,
    //private _custauthService: CustomerAuthService
  ) { }


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
   * Authenticate the Customer
   */
  public fnForgotPasswordAction() {
    try {
      //Check form validity
      this.forgotPasswordForm.updateValueAndValidity();
      if (this.forgotPasswordForm.invalid) { /*this.fnRaiseErrors(this.forgotPasswordForm);*/ return false; }

      // let objforgotPasswordForm: RequestCustomerLogin = this.forgotPasswordForm.value;
      // this.boolLoading = true;
      // // this._logger.log('Your log message goes here');
      // this._custauthService.login(objforgotPasswordForm)
      //   .subscribe((response: ResponseCustomerLogin) => {
      //     //Save the data into globals
      //     this._globals.setClaim(response);

      //     //Stop loader
      //     this.boolLoading = false;

      //     //Navidate to my account page
      //     this._router.navigate(['/user/my-account']);
      //   },() => {});
        // .then ((response) => {
        //   // this._logger.log('Your log message goes here');
        //   // this._logger.debug("Your Debug message goes here");
        //   // this._logger.warn("Your Warning message goes here");

        //   // this._router.navigate(['home']);
        // })
        // .catch()
        // .finally();
        return true;
    } catch (error) {
      //Stop loader
      this.boolLoading = false;
      return false;

      // this._objError = this._error.handleError(error);
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
      email: ['amit.dhongde@gmail.com', Validators.required]
    });
  } //Function ends

} //Class ends
