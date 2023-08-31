import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

//Application global files
import { Globals } from 'projects/crm-backend-web/src/app/app.global';
import { BaseComponent } from '../../../../../base.component';

//Application Libraries
import { NotificationService } from 'common-lib';
import { IUser, UserService } from 'crm-lib';
import { interval } from 'rxjs';

@Component({
  selector: 'crm-backend-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent  extends BaseComponent implements OnInit {
  @Input('form') userAccountForm: FormGroup = null;
  @Input('user') objUser: IUser = null;
  @Input('new') boolIsNew: boolean = false;
  @Input('refresh') boolRefresh: boolean = false;

  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;

  public listLanguages: any;
  public boolValidatingUsername: boolean = false;
  

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _notification: NotificationService,
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
    //Load languages supported
    let listLanguages: [] = Globals.APPLICATION_CONSTANT.LANGUAGES;
    this.listLanguages = listLanguages.filter((x: any) => { return x.is_active==true });
  } //Function ends


  /**
   * Toggle the User (active/deactive status)
   */
  public fnToggleActiveAction(): void {
    let boolCurrActiveState: boolean = (this.userAccountForm.contains('is_active'))?(this.userAccountForm.controls['is_active'].value):false;
    
    this.userAccountForm.patchValue({
      is_active: !boolCurrActiveState
    });
  } //Function ends


  /**
   * Validate Username for Duplicate
   * @param event 
   */
  public fnValidateUsername(event: any): void {
    let username: string = event?.target?.value;

    if (username.length>=3) {
      this.boolValidatingUsername=true;

      //Create object
      let param: Object = { 'username': username };

      this._userService.exists(param)
      .subscribe((response: any) => {
        let boolExists: boolean = response.data;

        if (boolExists) {
          this.userAccountForm.controls['username'].setErrors({'exists': boolExists});
        } //End if

        //Stop animation
        this.boolValidatingUsername = false;
      },(error) => {
        //Stop animation
        this.boolValidatingUsername = false;

        throw error;
      });
    } //End if    
  } //Function ends


  /**
   * Generate Ramdom Password for User
   * 
   * @param elem 
   */
  public fnGeneratePassword(elem): void {
    try {
      let dictionary = [].concat(
        Globals._PASSWORD_POLICY.RULES.LOWERCASE.library.split(""),
        Globals._PASSWORD_POLICY.RULES.UPPERCASE.library.split(""),
        Globals._PASSWORD_POLICY.RULES.NUMBERS.library.split(""),
        Globals._PASSWORD_POLICY.RULES.SYMBOLS.library.split("")
      );

      // Generate random password from array
      let lenPassword: number = (Math.random() * 20) + Globals._PASSWORD_POLICY.MIN_LENGTH;

      let generatedPassword: string = "";
      for (let i: number = 0; i < lenPassword; i++) {
        generatedPassword += dictionary[Math.floor(Math.random() * dictionary.length)];
      } //Loop ends

      //Set Generated password into the field
      elem.value=generatedPassword;
    } catch(error) {
      throw error;
    } //Try-catch ends
  } //Function ends

} //Class ends

