import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { ContactService, IContact } from 'crmo-lib';
import { BaseComponent } from '../../../base.component';

@Component({
  selector: 'crmo-backend-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;

  public chash: string;
  public objContact: IContact = null;


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _route: ActivatedRoute,
    private _contactService: ContactService,
  ) { super(); }


  /**
   * Lifecycle Hook's
   */
  ngOnInit(): void {

    //Initilaize component
    this.fnInitialize();
  } //Function ends


  public fnReloadData($event): void {
    this.fnLoadData(false);
  } //End if


  /**
   * Initialize
   */
  private fnInitialize(): void {
    let chash: string = this._route.snapshot.paramMap.get('chash');
    this.chash = chash;

    this.fnLoadData();
  } //Function ends

  /**
   * Load the data from the server
   * 
   * @param showLoader 
   */
  private fnLoadData(showLoader: boolean = true): void {

    //Set loading status
    this.boolLoading = showLoader;

    //Fetch data from server
    this._contactService.get(this.chash)
      .subscribe((response: IContact) => {
        //Clear leading status
        this.boolLoading = false;

        let data: IContact = response;
        if (data) {
          this.objContact = data;
        } //End If
      }, (error) => {
        //Stop loader
        this.boolLoading = false;

        throw error;
      });
  } //Function ends

} //Class ends
