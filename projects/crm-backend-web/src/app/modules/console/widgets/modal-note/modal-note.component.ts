import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Third Party components and libraries
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//Application files
import { Globals } from 'projects/crm-backend-web/src/app/app.global';

//Application Files
import { BaseComponent } from '../../../base.component';
import { INote, NoteService } from 'crm-lib';

@Component({
  selector: 'crm-backend-modal-note',
  templateUrl: './modal-note.component.html',
  styleUrls: ['./modal-note.component.scss']
})
export class ModalNoteComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;
  public boolIsNew: boolean = false;

  public strEntityType: string = '';
  public intReferenceId: number = 0;
  public objNote: INote|null = null;
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

    //New Note flag
    this.boolIsNew = (this.objNote && this.objNote.note)?false:true;
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

      //Transform form data into object
      let objFormData: INote = this.noteForm.value;

      //Action the note based on condition
      if (this.boolIsNew) {
        this.fnCreateNote(objFormData);
      } else {
        let noteId: number = this.objNote?.id as number;
        this.fnEditNote(noteId, objFormData);
      } //End if

      return true;
    } catch (error) {
      //Stop loader
      this.boolLoading = false;

      throw error;
    } //Try-catch ends
  } //Function ends


  /**
   * Create Note
   * @param data 
   */
  private fnCreateNote(data: INote): void {
    //Show loading state
    this.boolLoading = true;

    this._noteService.create(data)
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
  } //Fuction ends


  /**
   * Amend/Update the Note
   * 
   * @param data 
   */
  private fnEditNote(id: number, data: INote): void {
    //Show loading state
    this.boolLoading = true;

    this._noteService.update(id.toString(), data)
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
  } //Fuction ends


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
