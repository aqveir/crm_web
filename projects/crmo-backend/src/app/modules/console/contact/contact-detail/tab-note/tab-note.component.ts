import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

//Application libraries
import { EventBrokerService } from 'ellaisys-lib';
import { IContact, INote} from 'crmo-lib';

//Application Files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../../base.component';

@Component({
  selector: 'crmo-backend-tab-note',
  templateUrl: './tab-note.component.html',
  styleUrls: ['./tab-note.component.scss']
})
export class TabNoteComponent extends BaseComponent implements OnInit {
  @Input('contact') objContact: IContact = null;
  @Output('refresh') boolRefresh: EventEmitter<boolean> = new EventEmitter<boolean>();

  public objNote: INote = null;


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
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

    //this.fnLoadData();
  } //Function ends


  public fnAddEditNote(objNote?: INote): void {
    this._broker.emit('show_note_modal', ['entity_type_contact', this.objContact?.id, objNote, ((status: boolean)=>{
      this.boolRefresh.emit(status);
    })]);
  } //Function ends

} //Class ends
