import { Component, OnInit } from '@angular/core';

//Third Party components and libraries
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { IServiceRequest, CommunicationService } from 'crmo-lib';

//Application Files
import { BaseComponent } from '../../../base.component';

@Component({
  selector: 'crmo-backend-modal-confirm-call',
  templateUrl: './modal-confirm-call.component.html',
  styleUrls: ['./modal-confirm-call.component.scss']
})
export class ModalConfirmCallComponent extends BaseComponent implements OnInit { 
  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;

  public objServiceRequest: IServiceRequest;


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
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
  } //Function ends


  /**
   * Call Connect
   */
  public fnCallConfirmModal(): boolean {
    try {
      this.boolLoading = true;

      this._commService.sendMail(this.objServiceRequest.hash)
        .subscribe((response: any) => {
          //Stop loader
          this.boolLoading = false;

          //Close the modal window
          this._modalActive.close({confirm: true});
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
   * Close Modal window
   * 
   * @param isDismissed 
   */
  public fnCloseModal(isDismissed: boolean=false): void {
    if (isDismissed) {
      this._modalActive.dismiss({confirm: false});
    } else {
      this._modalActive.close({confirm: false});
    } //End if    
  } //Function ends

} //Class ends
