import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

//Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { IContact, INote} from 'crmo-lib';

//Application Files
import { BaseComponent } from '../../../../base.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalNoteComponent } from '../../../widgets/modal-note/modal-note.component';

@Component({
  selector: 'crmo-backend-tab-note',
  templateUrl: './tab-note.component.html',
  styleUrls: ['./tab-note.component.scss']
})
export class TabNoteComponent extends BaseComponent implements OnInit {
  @Input('contact') objContact: IContact;
  @Output('refresh') boolRefresh: EventEmitter<boolean> = new EventEmitter<boolean>();
  //@ViewChild('modalNoteAmend') content: TemplateRef<any>;

  public objNote: INote = null;


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _modalConfig: NgbModalConfig,
    private _modalService: NgbModal
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

    //this.fnLoadData();
  } //Function ends


  public fnAddEditNote(_note?: INote): void {
    const modalNoteRef = this._modalService.open(ModalNoteComponent, {
      centered: true, backdrop: 'static', backdropClass: ''
    });
    modalNoteRef.componentInstance.strEntityType = 'entity_type_contact';
    modalNoteRef.componentInstance.intReferenceId = 5;
    modalNoteRef.componentInstance.objNote = _note;
  } //Function ends

  public fnNoteSaved($event): void {
    this.boolRefresh.emit(true);
  } //Function ends

} //Class ends
