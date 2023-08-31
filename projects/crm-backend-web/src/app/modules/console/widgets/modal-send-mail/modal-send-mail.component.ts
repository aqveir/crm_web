import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Third Party components and libraries
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//Application files
import { Globals } from 'projects/crm-backend-web/src/app/app.global';
import { ISendMailRequest, IServiceRequest, CommunicationService } from 'crm-lib';

//Application Files
import { BaseComponent } from '../../../base.component';
import { TranslateService } from 'common-lib';

@Component({
  selector: 'crm-backend-modal-send-mail',
  templateUrl: './modal-send-mail.component.html',
  styleUrls: ['./modal-send-mail.component.scss']
})
export class ModalSendMailComponent extends BaseComponent implements OnInit { 
  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;
  
  public objServiceRequest: IServiceRequest|null = null;
  public mailForm!: FormGroup;
  //public mailEditor = ClassicEditor;
  public mailEditorConfig: any = { 
    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
    //placeholder: this._translateService.getTranslation('WIDGET.MODAL.MAIL_SEND.FORM.MESSAGE.PLACEHOLDER')
  };

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _formBuilder: FormBuilder,
    private _modalActive: NgbActiveModal,
    private _commService: CommunicationService,
    private _translateService: TranslateService
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
      this.mailForm.updateValueAndValidity();
      if (this.mailForm.invalid) { 
        this.fnRaiseErrors(this.mailForm); 

        return false; 
      } //End if

      let objFormData: ISendMailRequest = this.mailForm.value;
      this.boolLoading = true;

      this._commService.sendMail(this.objServiceRequest?.hash as string, objFormData)
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
    this.mailForm.reset();
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
    this.mailForm = this._formBuilder.group({
      email_subject: ['', [ Validators.required, Validators.maxLength(200) ]],
      email_body: ['', [ Validators.required, Validators.maxLength(4000) ]]
    });
  } //Function ends

} //Class ends
