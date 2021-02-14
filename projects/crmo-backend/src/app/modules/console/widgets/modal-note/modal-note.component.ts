import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { INote, NoteService } from 'crmo-lib';

//Application Files
import { BaseComponent } from '../../../base.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'crmo-backend-modal-note',
  templateUrl: './modal-note.component.html',
  styleUrls: ['./modal-note.component.scss']
})
export class ModalNoteComponent extends BaseComponent implements OnInit {
  @Input('entity_type') strEntityType: string = null;
  @Input('reference_id') intReferenceId: number = 0;
  @Input('note') objNote: INote = null;
  @Output('saved') boolSaved: EventEmitter<boolean> = new EventEmitter<boolean>();

  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;

  public noteForm!: FormGroup;
  public modalNote: NgbActiveModal;

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _formBuilder: FormBuilder,
    private _noteService: NoteService,
    private _activeModal: NgbActiveModal,
    private _modalService: NgbModal
  ) {
    super();

    //Set Active Modal
    this.modalNote = _activeModal;
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

          //Refresh data
          this.boolSaved.emit(true);

          //Close the modal window
          this.modalNote.close({refresh: true});
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


  public fnCloseModal(): void {
    this.modalNote.dismiss();
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
