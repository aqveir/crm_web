import { Component, OnInit, ɵSWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__ } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../../base.component';

//Application Libraries
import { EventBrokerService, NotificationService } from 'common-lib';
import { IUser, UserService, IUserRequest, IRoleRequest, IRole } from 'crmo-lib';

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
    if (uuid=='new') {
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
      //Build the params for passing
      let params: Object = {'key': this.oHash};

      this.boolLoading = true;
      this._userService.show(this.uuid, params)
        .subscribe((response: IUser) => {
          //Stop loader
          this.boolLoading = false;

          //Fill Data into variable
          this.objUser = response;

          //Full the form controls with data
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


  /**
   * Save Data
   */
  public fnSaveAction(event: any): boolean {
    try {
      //Set phone values
      let controlPhoneData: any = this.userForm.controls['phone_form_control'].value;
      if (controlPhoneData && controlPhoneData['number'] && controlPhoneData['number'].length>0) {
        this.userForm.patchValue({
          phone: controlPhoneData['number'],
          phone_idd: controlPhoneData['iddCode'],
        });
      } else {
        this.userForm.controls['phone'].disable();
        this.userForm.controls['phone_idd'].disable();
      } //End if

      //Set confirm password
      if (this.boolIsNew) {
        this.userForm.patchValue({
          password_confirmation: this.userForm.controls['password'].value
        })
      } //End if

      //Check form validity
      this.userForm.updateValueAndValidity();
      if (this.userForm.invalid) { 
        let msgError: string = this.fnRaiseErrors(this.userForm);
        this._notification.error('Error', msgError);
        return false; 
      } //End if

      //Build the params for passing
      let params: Object = {'key': this.oHash};

      //Set form value to request object
      let dataUser: IUserRequest = this.userForm.value;

      this.boolLoading = true;
      if (this.boolIsNew) {
        this._userService.create(dataUser, params)
        .subscribe((response: any) => {
          //Show notification
          this._globals.showSuccess('NOTIFICATION.USER_DETAILS.SUCCESS_MESSAGE', true);

          //Action based on submitter
          this.fnPostSaveAction(event?.submitter?.id);

          //Stop loader
          this.boolLoading = false;
        },(error) => {
          //Stop loader
          this.boolLoading = false;
          throw error;
        });
      } else {
        this._userService.update(this.uuid, dataUser, params)
        .subscribe((response: any) => {
          //Show notification
          this._globals.showSuccess('NOTIFICATION.USER_DETAILS.SUCCESS_MESSAGE', true);

          //Action based on submitter
          this.fnPostSaveAction(event?.submitter?.id);

          //Stop loader
          this.boolLoading = false;
        },(error) => {
          //Stop loader
          this.boolLoading = false;
          throw error;
        });
      } //End if
      return true;
    } catch (error) {
      //Stop loader
      this.boolLoading = false;

      throw error;
    } //Try-catch ends
  } //Function ends


  /**
   * Post Save Action
   * 
   * @param submitterId
   */
  private fnPostSaveAction(submitterId: string): void {
    //Action based on submitter
    switch (submitterId) {
      case 'save_and_new':
        this._router.navigate(['secure/setting/organization', this.oHash, 'user', 'new'])
          .then(() => {
            window.location.reload();
          });
        break;

      case 'save_and_exit':
        this._router.navigate(['secure/setting/organization', this.oHash, 'user']);
        break;
    
      case 'save_and_continue':
      default:
        //Do nothing
        break;
    } //End switch
  } //function ends


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
        phone_form_control: this.objUser.phone?this.objUser.phone:'',
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
      this.userForm.controls['password'].disable();
      this.userForm.controls['password_confirmation'].disable();

      //Set roles collection
      let userRoles: IRole[] = this.objUser?.roles;
      let countValue: number = (userRoles)?(userRoles).length:0;
      for (let index = 0; index < countValue; index++) {
        let userRoleForm: FormGroup = this.fnRoleForm();
        userRoleForm.patchValue({
          key: userRoles[index].key,
          account_id: null,
          description: null
        });

        //Push the data into FormArray
        (<FormArray>this.userForm.controls['roles']).push(userRoleForm);
      } //Loop ends
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
      password: ['', [ 
        Validators.required,
        Validators.minLength(Globals._PASSWORD_POLICY.MIN_LENGTH), 
        Validators.maxLength(Globals._PASSWORD_POLICY.MAX_LENGTH), 
        Validators.pattern(Globals._PASSWORD_POLICY.REGEX_PATTERN) ]],
      password_confirmation: [''],
      first_name: ['', [ Validators.required ]],
      last_name: [''],
      phone: [''],
      phone_idd: [''],
      phone_form_control: [''],
      email: ['', [ Validators.required, Validators.email ]],
      timezone_id: [''],
      language: ['en'],
      is_remote_access_only: [false],
      is_active: [true],
      roles: this._formBuilder.array([]),
      privileges: ['']
    });
  } //Function ends
  private fnRoleForm(): FormGroup {
    return this._formBuilder.group({
      key: ['', [ Validators.required ]],
      account_id: [''],
      description: ['']
    });
  } //Function ends

} //Class ends
