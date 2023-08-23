import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Third Party components and libraries
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';

//Application Files
import { BaseComponent } from '../../../base.component';

@Component({
  selector: 'crmo-backend-modal-confirm-delete',
  templateUrl: './modal-confirm-delete.component.html',
  styleUrls: ['./modal-confirm-delete.component.scss']
})
export class ModalConfirmDeleteComponent extends BaseComponent implements OnInit { 
  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;
  
  public strDeleteConfirmText: string = 'delete';
  public delConfirmForm!: FormGroup;


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _formBuilder: FormBuilder,
    private _modalActive: NgbActiveModal,
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
      //Validate that the input matches with confirmaton text
      if (this.delConfirmForm.controls['delete_confirmation'].value != this.strDeleteConfirmText) {
        this.delConfirmForm.controls['delete_confirmation'].setErrors({'key_mismatch': true});
      } else {
        this.delConfirmForm.controls['delete_confirmation'].setErrors(null);
      } //End if

      //Check form validity
      this.delConfirmForm.updateValueAndValidity();
      if (this.delConfirmForm.invalid) { 
        this.fnRaiseErrors(this.delConfirmForm); 

        return false; 
      } //End if

      //Close the modal window
      this._modalActive.close({delete: true});

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
    this.delConfirmForm.reset();
  } //Function ends


  /**
   * Close Modal window
   * 
   * @param isDismissed 
   */
  public fnCloseModal(isDismissed: boolean=false): void {
    if (isDismissed) {
      this._modalActive.dismiss({delete: false});
    } else {
      this._modalActive.close({delete: false});
    } //End if    
  } //Function ends


  /**
   * Initialize Reactive Form
   */
  private fnInitializeForm() {
    this.delConfirmForm = this._formBuilder.group({
      delete_confirmation: ['', [ Validators.required, Validators.maxLength(200) ]],
    });
  } //Function ends

} //Class ends

