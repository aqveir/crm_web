import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Third Party components and libraries
import moment from 'moment';
import { NgbActiveModal, NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

//Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';

//Application Files
import { BaseComponent } from '../../../base.component';
import { ILookup, ILookupValue, ITaskMinimal, ITaskRequest, IUserMinimal, TaskService } from 'crmo-lib';


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
  public objTask: ITaskMinimal = null;
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

    //Load OrganizationUsers (Assignee)
    this.listActiveUsers = this._globals.getOrgUsers(true);

    this.fnInitializeForm();

    //Load page depending upon task data
    if (this.objTask==null) {
      this.fnCreateData();
    } else {
      //Load data for existing hash value
      this.fnFillData();
    } //End if
  } //Function ends
  

  /**
   * Create data
   */
  private fnCreateData(): void {
    //Set new flag
    this.boolIsNew = true;

    //Get Current Date
    let currDate: Date = new Date();

    //Set StartAt Form
    this.startAtForm.patchValue({
      date_picker: this._calendar.getToday(),
      time_picker: { hour: currDate.getHours(), minute: currDate.getMinutes(), second: 0 }
    });

    //Set EndAt Form
    this.endAtForm.patchValue({
      date_picker: this._calendar.getNext(this.startAtForm.controls['date_picker'].value),
      time_picker: { hour: currDate.getHours(), minute: currDate.getMinutes(), second: 0 }
    });

    //Set Task Form defaults
    this.taskForm.patchValue({
      assignee_hash: this._globals.getClaim()?.hash
    });

  } //Function ends


  /**
   * Load form data
   */
  private fnFillData(): void {
    if (this.objTask && this.taskForm) {     
      this.taskForm.patchValue({
        sr_hash: this.objTask.servicerequest?.hash,
        subject: this.objTask.subject,
        description: this.objTask.description,
        subtype_key: this.objTask.subtype?.key,
        assignee_hash: this._globals.getClaim()?.hash,
        priority_key: this.objTask.priority?.key,
        status_key: this.objTask.status?.key
      });

      //Calculate and Set StartAt Value
      let startAtNgbFormat: any = this.fnConvertJsDateToNgbFormatDateTime(this.objTask.start_at);
      this.startAtForm.patchValue({
        date_picker: NgbDate.from(startAtNgbFormat.date),
        time_picker: startAtNgbFormat.time
      });

      //Calculate and Set EndAt Value
      let endAtNgbFormat: any = this.fnConvertJsDateToNgbFormatDateTime(this.objTask.end_at);
      this.endAtForm.patchValue({
        date_picker: NgbDate.from(endAtNgbFormat.date),
        time_picker: endAtNgbFormat.time
      });

    } //End if
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

      //Get Date-Time for Transformation
      let startAt: moment.Moment = moment(this.startAtForm.controls['date_picker'].value).subtract(1, 'month')
      .add(this.startAtForm.controls['time_picker'].value);
      let endAt: moment.Moment = moment(this.endAtForm.controls['date_picker'].value).subtract(1, 'month')
      .add(this.endAtForm.controls['time_picker'].value);

      let objFormData: ITaskRequest = this.taskForm.value;
      objFormData.start_at = startAt.toISOString(true);
      objFormData.end_at = endAt.toISOString(true);

      console.log(objFormData);
      return false;
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


  /**
   * Date/Time Control Update Event
   * 
   * @param event 
   * @param type 
   */
  public fnDateTimeControlUpdated(event: NgbDate, type: string='endAt'): void {
    //Get Date-Time picker values
    let startAt: moment.Moment = moment(this.startAtForm.controls['date_picker'].value).subtract(1, 'month')
      .add(this.startAtForm.controls['time_picker'].value);
    let endAt: moment.Moment = moment(this.endAtForm.controls['date_picker'].value).subtract(1, 'month')
      .add(this.endAtForm.controls['time_picker'].value);

    //Compare StartAt and EndAt
    if (startAt.isSameOrAfter(endAt)) {
      //Increase the EndAt Date by 24 hours
      let endAtNew: moment.Moment = startAt.clone().add(1, 'days');

      this.endAtForm.patchValue({
        date_picker: NgbDate.from(this.fnConvertMomentToNgbFormatDateTime(endAtNew).date),
        time_picker: this.fnConvertMomentToNgbFormatDateTime(endAtNew).time
      });
    } //End if
  } //Function ends


  /**
   * Initialize Reactive FormGroups
   */
  private fnInitializeForm() {
    this.startAtForm = this.fnDateFormGroup();
    this.endAtForm = this.fnDateFormGroup();

    this.taskForm = this._formBuilder.group({
      sr_hash: ['', [ Validators.required]],
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


  /**
   * FormGroup for Ngb Date and Time
   */
  private fnDateFormGroup(): FormGroup {
    return this._formBuilder.group({
      date_picker: ['', [ Validators.required ]],
      time_picker: [{hour: 13, minute: 30, second: 0}],        
    })
  } //Function ends

} //Class ends