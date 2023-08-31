import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Third Party components and libraries
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//Application files
import { Globals } from 'projects/crm-backend-web/src/app/app.global';

//Application Files
import { BaseComponent } from '../../../base.component';
import { ICountry, ILookup, ILookupValue, INote, NoteService } from 'crm-lib';

@Component({
  selector: 'crm-backend-widget-address-block',
  templateUrl: './widget-address-block.component.html',
  styleUrls: ['./widget-address-block.component.scss']
})
export class WidgetAddressBlockComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;
  public boolIsNew: boolean = false;

  public strEntityType: string|null = null;
  public intReferenceId: number = 0;
  public objNote: INote|null = null;
  public addressForm!: FormGroup;

  public listCountries: ICountry[]|null = null;
  public listLookupAddressType: ILookupValue[]|null = null;

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
    
    //Load country values
    this.listCountries = this._globals.getCountries() as ICountry[];

    //Load lookup values (Contact Address Type)
    let objAddressType: ILookup = this._globals.getLookupByKey('contact_address_type') as ILookup;
    if (objAddressType) {
      this.listLookupAddressType = (objAddressType?.values)?.filter((x: ILookupValue) => {return x.is_active==true}) as ILookupValue[];
    } //End if

    //Initialize form
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
      this.addressForm.updateValueAndValidity();
      if (this.addressForm.invalid) { 
        this.fnRaiseErrors(this.addressForm); 

        return false; 
      } //End if

      //Transform form data into object
      let objFormData: INote = this.addressForm.value;

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

    // this._noteService.update(id, data)
    // .subscribe((response: any) => {
    //   //Stop loader
    //   this.boolLoading = false;

    //   //Close the modal window
    //   this._modalActive.close({refresh: true});
    // },(error) => {
    //   //Stop loader
    //   this.boolLoading = false;

    //   //Show Error
    //   this.hasError = true;

    //   throw error;
    // }); 
  } //Fuction ends


  /**
   * Reset form
   */
  public fnResetForm(): void {
    this.addressForm.reset();
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



  public fnOnControlModify(event: any): void {
    try {
      if (this.addressForm.dirty) {

      }
    } catch (error) {
      throw error;
    } //Try-catch error
  } //Function ends


  /**
   * Initialize Reactive Form
   */
  private fnInitializeForm() {
    this.addressForm = this._formBuilder.group({
      type_key: ['contact_address_type_home'],
      address1: [ '' ],
      address2: [''],
      locality: [''],
      city: [''],
      state: [''],
      country_code: [null],
      zipcode: ['']
    });
  } //Function ends

} //Class ends
