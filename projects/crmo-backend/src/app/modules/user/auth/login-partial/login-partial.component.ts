import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'crmo-backend-login-partial',
  templateUrl: './login-partial.component.html',
  styleUrls: ['./login-partial.component.scss']
})
export class LoginPartialComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;

  public loginForm!: FormGroup;
  public hasError: boolean = false;
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
    this.fnLoginForm();

  } //Function ends

  /**
   * Authenticate the Customer
   */
  public fnAuthenticateUserAction(): boolean {
    try {
      //Check form validity
      this.loginForm.updateValueAndValidity();
      if (this.loginForm.invalid) { /*this.fnRaiseErrors(this.loginForm);*/ return false; }

      // let objLoginForm: RequestCustomerLogin = this.loginForm.value;
      // this.boolLoading = true;
      // // this._logger.log('Your log message goes here');
      // this._custauthService.login(objLoginForm)
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
    this.loginForm.reset();
  } //Function ends


  /**
   * Login Reactive Form
   */
  private fnLoginForm() {
    this.loginForm = this._formBuilder.group({
      email: ['amit.dhongde@gmail.com', Validators.required],
      password: ['12345678', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
      remember_me: true,
      country_idd: ['91'],
      device_id: ['xxxx']
    });
  } //Function ends

} //Class ends
