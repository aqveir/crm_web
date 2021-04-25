import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../../base.component';

//Application Libraries
import { EventBrokerService, NotificationService } from 'ellaisys-lib';
import { IUser, IResponse, UserService } from 'crmo-lib';

@Component({
  selector: 'crmo-backend-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;

  public oHash: string;
  public uuid: string;
  public objUser: any;
  public boolRefresh: boolean = false;
  public boolIsNew: boolean = false;

  public userForm!: FormGroup;


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _notification : NotificationService,
    private _broker: EventBrokerService
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
    //Show Submenu
    this._broker.emit(Globals.EVENT_SHOW_SUBMENU, true);

    //Get params from the page route
    let oHash: string = this._route.snapshot.paramMap.get('ohash');
    let uuid: string = this._route.snapshot.paramMap.get('uhash');

    this.oHash = oHash;
    this.uuid = uuid;

    //Initialize Form
    this.fnInitializeForm();

    //Create User Object
    if (uuid=='0') {
      this.fnCreateData();
    } else {
      //Load form
      this.fnLoadData();      
    } //End if

  } //Function ends


  /**
   * Create data
   */
  private fnCreateData(): void {
    //Set new flag
    this.boolIsNew = true;

    //Initialize form
    this.fnInitializeForm();
  } //Function ends
 
  
  /**
   * Get Data
   */
  public fnLoadData(): boolean {
    try {
      this.boolLoading = true;
      this._userService.show(this.oHash, this.uuid)
        .subscribe((response: IUser) => {
          //Stop loader
          this.boolLoading = false;

          //Fill Data into variable
          this.objUser = response;
          this.fnFillData();
        },(error) => {
          //Stop loader
          this.boolLoading = false;

          throw error;
        });

        return true;
    } catch (error) {
      //Stop loader
      this.boolLoading = false;

      throw error;
    } //Try-catch ends
  } //Function ends


  public fnUpdateData(_objUser: IUser): boolean {
    try {
      this.boolRefresh = false;
      this.objUser = _objUser;
      this.boolRefresh = true;
      return true;
    } catch (error) {
      throw error;
    } //Try-catch ends 
  }


  /**
   * Save Data
   */
  public fnSaveAction(): boolean {
    try {
      //Check form validity
      this.userForm.updateValueAndValidity();
      if (this.userForm.invalid) { 
        this.fnRaiseErrors(this.userForm); 

        return false; 
      } //End if

      //Set values
      let dataUser: any = this.userForm.controls;

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
  private fnFillData(): void {
    if (this.objUser && this.userForm) {
      this.userForm.patchValue({
        avatar: this.objUser.avatar?this.objUser.avatar:'',
        username: this.objUser.username?this.objUser.username:'',
        first_name: this.objUser.first_name?this.objUser.first_name:'',
        last_name: this.objUser.last_name?this.objUser.last_name:'',
        phone: this.objUser.phone?this.objUser.phone:'',
        email: this.objUser.email?this.objUser.email:'',
        timezone_id: 0,
        language: this.objUser.language?this.objUser.language:'en',
        is_remote_access_only: this.objUser.is_remote_access_only?this.objUser.is_remote_access_only:false,
        is_active: this.objUser.is_active?this.objUser.is_active:true,
        roles: null,
        privileges: null
      });

      //Enable-Disable controls
      this.userForm.controls['username'].disable();
    } //End if
  } //Function ends


  /**
   * Reset form
   */
  public fnResetForm(boolNavBack: boolean=false): void {
    this.userForm.reset();

    if (boolNavBack) {
      this._router.navigate(['secure/setting/organization', this.oHash, 'user' ]);
    } //End if
  } //Function ends


  /**
   * Initialize Reactive Form
   */
  private fnInitializeForm(): void {
    this.userForm = this._formBuilder.group({
      avatar: [''],
      username: ['', [ Validators.required ]],
      first_name: ['', [ Validators.required ]],
      last_name: [''],
      phone: [''],
      email: ['', [ Validators.required, Validators.email ]],
      timezone_id: ['', [ Validators.required ]],
      language: ['en'],
      is_remote_access_only: [false],
      is_active: [true],
      roles: ['', [ Validators.required ]],
      privileges: ['']
    });
  } //Function ends

} //Class ends
