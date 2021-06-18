import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

//Third party libraries
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//Application libraries
import { EventBrokerService } from 'ellaisys-lib';
import { IContact, IDocument} from 'crmo-lib';

//Application Files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../../base.component';


@Component({
  selector: 'crmo-backend-tab-document',
  templateUrl: './tab-document.component.html',
  styleUrls: ['./tab-document.component.scss']
})
export class TabDocumentComponent extends BaseComponent implements OnInit {
  @Input('contact') objContact: IContact = null;
  @Output('refresh') boolRefresh: EventEmitter<boolean> = new EventEmitter<boolean>();

  public objNote: IDocument = null;


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
  } //Function ends


  /**
   * Upload the 
   */
  public fnUploadDocument(): void {
    this._broker.emit('show_document_modal', ['entity_type_contact', this.objContact?.id, ((status: boolean)=>{
      this.boolRefresh.emit(status);
    })]);
  } //Function ends

  
  /**
   * Download the file by identifier
   * 
   * @param _document 
   */
  public fnDocumentDownload(_document?: IDocument): void {

  } //Function ends

} //Class ends
