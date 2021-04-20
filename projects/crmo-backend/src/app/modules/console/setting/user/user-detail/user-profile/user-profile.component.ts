import { ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../../../base.component';

//Application Libraries
import { NotificationService } from 'ellaisys-lib';
import { IUser, IResponse, UserService, ILookup, ILookupValue } from 'crmo-lib';

@Component({
  selector: 'crmo-backend-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent  extends BaseComponent implements OnInit, OnChanges {
  @Input('user') objUser: IUser = null;
  @Input('refresh') boolRefresh: boolean = false;
  @Output('user') user: EventEmitter<IUser> = new EventEmitter<IUser>();
  @Output('save') saveEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;

  public userProfileForm!: FormGroup;
  public boolIsNewUser: boolean = false;

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
    if (changes && (changes.objUser || changes.boolRefresh)) {

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
      this.userProfileForm.updateValueAndValidity();
      if (this.userProfileForm.invalid) { 
        this.fnRaiseErrors(this.userProfileForm); 

        return false; 
      } //End if

      //Set values
      let objUser: IUser = this.objUser;
      let listControls: any = this.userProfileForm.controls;
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
    if (this.objUser && this.userProfileForm) {
      //check the new user status
      this.boolIsNewUser = (this.objUser?.hash==null)?true:false;

      this.userProfileForm.patchValue({
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
    this.userProfileForm.reset();
  } //Function ends


  /**
   * Initialize Reactive Form
   */
  private fnInitializeForm(): void {
    this.userProfileForm = this._formBuilder.group({
      avatar: [''],
      first_name: ['', [ Validators.required ]],
      last_name: [''],
      phone: [''],
      email: ['', [ Validators.email ]],
    });
  } //Function ends

} //Class ends
