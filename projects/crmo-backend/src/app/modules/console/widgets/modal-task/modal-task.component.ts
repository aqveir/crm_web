import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Third Party components and libraries
import { NgbActiveModal, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

//Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';

//Application Files
import { BaseComponent } from '../../../base.component';
import { ILookup, ILookupValue, ITaskRequest, IUserMinimal, TaskService } from 'crmo-lib';


@Component({
  selector: 'crmo-backend-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.scss']
})
export class ModalTaskComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;

  public strEntityType: string = null;
  public intReferenceId: number = 0;
  public srHash: string = null;
  public objTask: ITaskRequest = null;
  public taskForm!: FormGroup;
  public startAtForm!: FormGroup;
  public endAtForm!: FormGroup;
  public boolIsNew: boolean = false;

  public listActiveUsers: IUserMinimal[] = null;
  public listLookUpTaskSubtypeValues: ILookupValue[] = null;
  public listLookUpPriorityValues: ILookupValue[] = null;
  public listLookUpStatusValues: ILookupValue[] = null;

  public ngbDatepickerConfig: any = {};


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _formBuilder: FormBuilder,
    private _taskService: TaskService,
    private _modalActive: NgbActiveModal,
    private _calendar: NgbCalendar
  ) {
    super();
  }


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
    //Load lookup values (Task SubType)
    let listLookUpTaskSubtype: ILookup = this._globals.getLookupByKey('service_request_comm_type');
    if (listLookUpTaskSubtype) {
      this.listLookUpTaskSubtypeValues = (listLookUpTaskSubtype?.values).filter((x: ILookupValue) => {return ((x?.is_active)?(x.is_active==true):true) });
    } //End if

    //Load lookup values (Priority)
    let listLookUpPriority: ILookup = this._globals.getLookupByKey('service_request_activity_type_task_priority');
    if (listLookUpPriority) {
      this.listLookUpPriorityValues = (listLookUpPriority?.values).filter((x: ILookupValue) => {return ((x?.is_active)?(x.is_active==true):true) });
    } //End if

    //Load lookup values (Status)
    let listLookUpStatus: ILookup = this._globals.getLookupByKey('service_request_activity_type_task_status');
    if (listLookUpStatus) {
      this.listLookUpStatusValues = (listLookUpStatus?.values).filter((x: ILookupValue) => {return ((x?.is_active)?(x.is_active==true):true) });
    } //End if

    this.fnInitializeForm();

    //Load page depending upon task data
    if (this.objTask) {
      this.fnCreateData();
    } else {
      //Load data for existing hash value
      this.fnLoadData();     
    } //End if
  } //Function ends
  

  /**
   * Create data
   */
  private fnCreateData(): void {
    //Set new flag
    this.boolIsNew = true;

    let currDate: Date = new Date();

    this.startAtForm.patchValue({
      date_picker: this._calendar.getToday(),
      time_picker: {
        hour: currDate.getHours(),
        minute: currDate.getMinutes(),
        second: 0
      }
    });

    this.endAtForm.patchValue({
      date_picker: this._calendar.getNext(this.startAtForm.controls['date_picker'].value),
      time_picker: {
        hour: currDate.getHours(),
        minute: currDate.getMinutes(),
        second: 0
      }
    });

  } //Function ends


  /**
   * Get Data
   */
  public fnLoadData(): boolean {
    try {
      //Build the params for passing

      //this.boolLoading = true;
      // this._organizationService.show(this.oHash, params)
      //   .subscribe((response: IOrganization) => {
      //     //Stop loader
      //     this.boolLoading = false;

      //     //Update Setting Information
      //     this._globals.updateSettingInfo('selected_oHash', this.oHash);

      //     //Raise event to show submenu
      //     this._broker.emit<boolean>(Globals.EVENT_SHOW_SUBMENU, true);

      //     //Set param
      //     this.objOrganization = response;

      //     //Full the form controls with data
      //     this.fnFillData();
      //   },(error) => {
      //     //Stop loader
      //     this.boolLoading = false;

      //     throw error;
      //   });

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
  public fnSaveAction(): boolean {
    try {
      //Check form validity
      this.taskForm.updateValueAndValidity();
      if (this.taskForm.invalid) { 
        this.fnRaiseErrors(this.taskForm); 

        return false; 
      } //End if

      let objFormData: ITaskRequest = this.taskForm.value;
      this.boolLoading = true;

      this._taskService.create(objFormData)
        .subscribe((response: any) => {
          //Stop loader
          this.boolLoading = false;

          //Close the modal window
          this._modalActive.close({refresh: true});
        },(error: any) => {
          //Stop loader
          this.boolLoading = false;

          //Show Error
          this.hasError = true;

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
   * Reset form
   */
  public fnResetForm(): void {
    this.taskForm.reset();
  } //Function ends


  /**
   * Close Modal window
   * 
   * @param isDismissed 
   */
  public fnCloseModal(isDismissed: boolean=false): void {
    if (isDismissed) {
      this._modalActive.dismiss({refresh: false});
    } else {
      this._modalActive.close({refresh: false});
    } //End if    
  } //Function ends


  public fnDateControlUpdated(event: NgbDate, type: string='endAt'): void {
    let startAt: NgbDate = NgbDate.from(this.startAtForm.controls['date_picker'].value);
    let endAt: NgbDate = NgbDate.from(this.endAtForm.controls['date_picker'].value);

    if (!(startAt.before(endAt))) {
      this.endAtForm.patchValue({
        date_picker: this._calendar.getNext(startAt)
      });
    } //End if
  } //Function ends


  /**
   * Initialize Reactive Form
   */
  private fnInitializeForm() {

    this.startAtForm = this.fnDateFormGroup();
    this.endAtForm = this.fnDateFormGroup();

    this.taskForm = this._formBuilder.group({
      sr_hash: [''],
      subject: ['', [ Validators.required, Validators.maxLength(150)]],
      description: ['', [ Validators.maxLength(1000) ]],
      start_at: this.startAtForm,
      end_at: this.endAtForm,
      scheduled_at: [],
      subtype_key: ['comm_type_other', [ Validators.required ]],
      assignee_hash: ['', [ Validators.required ]],
      priority_key: ['priority_normal', [ Validators.required ]],
      status_key: ['task_status_not_started', [ Validators.required ]]
    });
  } //Function ends


  private fnDateFormGroup(): FormGroup {
    return this._formBuilder.group({
      date_picker: ['', [ Validators.required ]],
      time_picker: [{hour: 13, minute: 30, second: 0}],        
    })
  }

} //Class ends