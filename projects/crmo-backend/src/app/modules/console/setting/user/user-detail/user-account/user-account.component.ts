import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../../../base.component';

//Application Libraries
import { NotificationService } from 'ellaisys-lib';
import { IUser, IResponse, UserService, ILookup, ILookupValue } from 'crmo-lib';

@Component({
  selector: 'crmo-backend-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent  extends BaseComponent implements OnInit, OnChanges {
  @Input('user') objUser: IUser = null;
  @Output('user') user: EventEmitter<IUser> = new EventEmitter<IUser>();
  @Output('save') saveEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;

  public userAccountForm!: FormGroup;
  

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
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
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.objUser) {

      //Load data on form
      this.fnLoadData();
    } //End if
  } //Function ends

  
  /**
   * Initialize
   */
  private fnInitialize(): void {
    //Load form
    this.fnInitializeForm();
  } //Function ends

  
  /**
   * Save Data
   */
  public fnSaveAction(): boolean {
    try {
      //Check form validity
      this.userAccountForm.updateValueAndValidity();
      if (this.userAccountForm.invalid) { 
        this.fnRaiseErrors(this.userAccountForm); 

        return false; 
      } //End if

      //Set values
      let objUser: IUser = this.objUser;
      let listControls: any = this.userAccountForm.controls;
      Object.keys(listControls).forEach((key: string) => {
        objUser[key] = (listControls[key].dirty)?listControls[key].value:objUser[key];

        //Update username for new user (without hash value)
        if (key=='email' && objUser['hash']==null) {
          objUser['username'] = objUser['email'];
        } //End if
      });

      //Emit data to update save
      this.user.emit(objUser);

      return true;
    } catch (error) {
      //Stop loader
      this.boolLoading = false;

      throw error;
    } //Try-catch ends
  } //Function ends


  /**
   * Load form data
   */
  private fnLoadData(): void {
    if (this.objUser) {
      this.userAccountForm.patchValue({
        avatar: this.objUser.avatar?this.objUser.avatar:'',
        first_name: this.objUser.first_name?this.objUser.first_name:'',
        last_name: this.objUser.last_name?this.objUser.last_name:'',
        phone: this.objUser.phone?this.objUser.phone:'',
        email: this.objUser.email?this.objUser.email:'',
      });
    } //End if
  } //Function ends


  /**
   * Reset form
   */
  public fnResetForm(): void {
    this.userAccountForm.reset();
  } //Function ends


  /**
   * Initialize Reactive Form
   */
  private fnInitializeForm(): void {
    this.userAccountForm = this._formBuilder.group({
      avatar: [''],
      first_name: ['', [ Validators.required ]],
      last_name: [''],
      phone: [''],
      email: ['', [ Validators.email ]],
    });
  } //Function ends

} //Class ends

