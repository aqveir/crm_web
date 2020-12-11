import { Component, OnInit } from '@angular/core';

//Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { ContactService, IContact } from 'crmo-lib';
import { BaseComponent } from '../../base.component';


@Component({
  selector: 'crmo-backend-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent extends BaseComponent implements OnInit {
  //Common attributes
  public isLoading: boolean = false;

  public listContact: IContact[] = null;
  public pageCountLoaded: number = 0;

  private filterName: string = 'my_all';
  private pageFrom: number = 0;
  private pageSize: number = 0;
  private isScrollLoading: boolean = false;


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _contactService: ContactService,
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
    this.fnLoadContacts();
  } //Function ends


  private fnLoadContacts(viewName: string='*', customFilter: any=null, payload: any=null, showLoader: boolean = true): void {
    //Page view, position and size
    let pageFrom: string = (this.pageFrom > 0) ? this.pageFrom.toString() : '0';
    let pageSize: string = (this.pageSize > 0) ? this.pageSize.toString() : '0';

    //Set loading status
    this.isLoading = showLoader;
    this.isScrollLoading = true;

    //Fetch data from server
    this._contactService.getAll(viewName, this.filterName, pageFrom, pageSize, payload)
      .subscribe((response: IContact[]) => {
        //Clear leading status
        this.isLoading = false;
        this.isScrollLoading = false;

        let dataArray: IContact[] = response;
        if (dataArray && dataArray.length > 0) {
          if (!this.listContact) { this.listContact = []; }

          //Fill list array
          dataArray.forEach((data: IContact) => {
            this.listContact.push(data);
          });

          //Set the from status
          this.pageFrom = (this.listContact && this.listContact.length > 0) ? this.listContact.length : 0;
        } else if (this.pageFrom < 1) {
          this.listContact = [];
        } else {
          //Do Nothing 
        } //End If
        this.pageCountLoaded = this.listContact.length;

      }, (error) => {
        //Stop loader
        this.isLoading = false;
        this.isScrollLoading = false;

        throw error;
      });
  } //Function ends


  public fnSortColumn(columnName: string, sortDir: string): void {

  }

} //Class ends
