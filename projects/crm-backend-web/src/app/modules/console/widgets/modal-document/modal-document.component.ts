import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Third Party components and libraries
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UppyAngularComponent, UppyConfig } from 'uppy-angular';

//Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { environment } from '@env-backend/environment';
import { BaseComponent } from '../../../base.component';
import { IDocument, INote, NoteService } from 'crmo-lib';
import { NotificationService, TranslateService } from 'common-lib';


@Component({
  selector: 'crmo-backend-modal-document',
  templateUrl: './modal-document.component.html',
  styleUrls: ['./modal-document.component.scss']
})
export class ModalDocumentComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;

  public strEntityType: string = null;
  public intReferenceId: number = 0;
  public documentForm!: FormGroup;
  public uppySettings: UppyConfig = {
    uploadAPI: {
      endpoint: environment.uppy_configuration.document_upload.xhr_endpoint,
      headers: {
        Authorization: 'bearer ' + this._globals.getClaim()['token']
      }
    },
    plugins: {
      Webcam: false,
      GoogleDrive: true,
      Instagram: false,
      Facebook: false,
      Dropbox: true,
      ScreenCapture:false
    },
    restrictions: {
      maxFileSize: environment.uppy_configuration.document_upload.file_size_bytes,
      maxNumberOfFiles: 5,
      minNumberOfFiles: 1,
      allowedFileTypes: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.jpeg', '.png', '.zip', '.rar', '.txt', '.csv']
    },
    statusBarOptions: {
      hideUploadButton: true,
    },
    uploaderLook: {
      proudlyDisplayPoweredByUppy: false
    },
    options: {
      id: 'crmoni_document_upload', //A site-wide unique ID for the instance.
      debug: false,
      browserBackButtonClose: true,
      autoProceed: false, //Setting this to true will start uploading automatically after the first file is selected without waiting for upload button trigger.
      allowMultipleUploads: false, //Setting this to true,  users can upload some files, and then add more files and upload those as well
      meta: {} //Metadata object, used for passing things like public keys, usernames, tags and so on
    }
  };


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _formBuilder: FormBuilder,
    private _noteService: NoteService,
    private _modalActive: NgbActiveModal,
    private _notification: NotificationService,
    private _translate: TranslateService
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
  public fnSaveAction(event: any, _uppy: UppyAngularComponent): boolean {
    try {
      //Check form validity
      this.documentForm.updateValueAndValidity();
      if (this.documentForm.invalid) { 
        this.fnRaiseErrors(this.documentForm); 
        return false; 
      } //End if

      //Collect Form data
      let objFormData: any = this.documentForm.value;
      this.boolLoading = true;

      _uppy.uppyInstance.setMeta(objFormData);
      _uppy.uppyInstance.upload()
      .then((result: any) => {
        let isRefresh: boolean = false;
        let errorMsgs: string[] = null;

        //Stop loader
        this.boolLoading = false;

        //Check for upload status (success/failure)
        if (result.failed?.length > 0) {
          errorMsgs = [];
          result.failed.forEach((file: any) => {
            errorMsgs.push(file.error);
          });
        } else {
          isRefresh=true;
        } //End if

        //Uppy reset and close
        _uppy.uppyInstance.reset();
        _uppy.uppyInstance.close();

        this.fnCloseModal(false, isRefresh, errorMsgs);
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
    this.documentForm.reset();
  } //Function ends


  /**
   * Close Modal window
   * 
   * @param isDismissed 
   */
  public fnCloseModal(isDismissed: boolean=false, isForcedRefresh: boolean=false, _error: any=null): void {
    if (isDismissed) {
      this._modalActive.dismiss({refresh: isForcedRefresh, error: _error});
    } else {
      this._modalActive.close({refresh: isForcedRefresh, error: _error});
    } //End if    
  } //Function ends


  /**
   * Initialize Reactive Form
   */
  private fnInitializeForm() {
    this.documentForm = this._formBuilder.group({
      entity_type: [(this.strEntityType?this.strEntityType:''), Validators.required],
      reference_id: [(this.intReferenceId?this.intReferenceId:''), Validators.required],
      title: ['', [ Validators.required, Validators.maxLength(4000)]],
    });
  } //Function ends

} //Class ends
