import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Third Party components and libraries
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';

//Application Files
import { BaseComponent } from '../../../base.component';
import { INote, NoteService } from 'crmo-lib';

@Component({
  selector: 'crmo-backend-modal-filters',
  templateUrl: './modal-filters.component.html',
  styleUrls: ['./modal-filters.component.scss']
})
export class ModalFiltersComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;

  public strEntityType: string = null;
  public intReferenceId: number = 0;
  public objNote: INote = null;
  public noteForm!: FormGroup;


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _formBuilder: FormBuilder,
    private _noteService: NoteService,
    private _modalActive: NgbActiveModal
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
      this.noteForm.updateValueAndValidity();
      if (this.noteForm.invalid) { 
        this.fnRaiseErrors(this.noteForm); 

        return false; 
      } //End if

      let objFormData: INote = this.noteForm.value;
      this.boolLoading = true;

      this._noteService.create(objFormData)
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
    this.noteForm.reset();
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
    this.noteForm = this._formBuilder.group({
      entity_type: [(this.strEntityType?this.strEntityType:''), Validators.required],
      reference_id: [(this.intReferenceId?this.intReferenceId:''), Validators.required],
      note: [(this.objNote?this.objNote.note:''), [
        Validators.required,
        Validators.maxLength(4000),
        //Validators.pattern('[\\S]*')
      ]],
    });
  } //Function ends

} //Class ends
