import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Application files
import { Globals } from 'projects/crm-backend-web/src/app/app.global';
import { ISendSmsRequest, IServiceRequest, CommunicationService } from 'crm-lib';

//Application Files
import { BaseComponent } from '../../../base.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'crm-backend-modal-send-sms',
  templateUrl: './modal-send-sms.component.html',
  styleUrls: ['./modal-send-sms.component.scss']
})
export class ModalSendSmsComponent extends BaseComponent implements OnInit { 
  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;
  
  public objServiceRequest: IServiceRequest|null = null;
  public smsForm!: FormGroup;

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _formBuilder: FormBuilder,
    private _modalActive: NgbActiveModal,
    private _commService: CommunicationService
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
    this.fnInitializeForm();
  } //Function ends
  

  /**
   * Save Data
   */
  public fnSaveAction(): boolean {
    try {
      //Check form validity
      this.smsForm.updateValueAndValidity();
      if (this.smsForm.invalid) { 
        this.fnRaiseErrors(this.smsForm); 

        return false; 
      } //End if

      let objFormData: ISendSmsRequest = this.smsForm.value;
      this.boolLoading = true;

      if (!this.objServiceRequest) {
        return false;
      } //End if

      this._commService.sendSMS(this.objServiceRequest.hash, objFormData)
        .subscribe((response: any) => {
          //Stop loader
          this.boolLoading = false;

          //Close the modal window
          this._modalActive.close({refresh: true});
        },(error) => {
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
    this.smsForm.reset();
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
   * Initialize Reactive Form
   */
  private fnInitializeForm() {
    this.smsForm = this._formBuilder.group({
      sms_message: ['', [ Validators.required, Validators.maxLength(200) ]],
    });
  } //Function ends

} //Class ends
