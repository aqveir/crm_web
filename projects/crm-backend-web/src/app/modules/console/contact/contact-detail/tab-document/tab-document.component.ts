import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

//Third party libraries
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//Application libraries
import { EventBrokerService } from 'common-lib';
import { DocumentService, IContact, IDocument} from 'crm-lib';

//Application Files
import { Globals } from 'projects/crm-backend-web/src/app/app.global';
import { BaseComponent } from '../../../../base.component';


@Component({
  selector: 'crm-backend-tab-document',
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
    private _broker: EventBrokerService,
    private _documentService: DocumentService
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
  public fnDownloadDocument(_document?: IDocument): void {
    this._documentService.download(_document?.hash)
    .subscribe((response: Blob) => {
      //let data: any = new Blob([response]); //, {type: 'application/pdf'});

      let downloadURL = window.URL.createObjectURL(response);
      let link = document.createElement('a');
      link.href = downloadURL;
      link.download = _document?.file_name;
      link.click();

      this._globals.showSuccess('Successfully Downloaded');
    },(error) => {
      throw error;
    });
  } //Function ends


  /**
   * Delete Document action
   * 
   * @param objNote 
   */
  public fnDeleteDocument(_document: IDocument): void {
    this._documentService.delete(_document?.hash)
    .subscribe((response: any) => {
      this._globals.showSuccess('Successfully Deleted');

      //Refresh List
      this.boolRefresh.emit(true);
    },(error) => {
      throw error;
    });
  } //Function ends

} //Class ends
