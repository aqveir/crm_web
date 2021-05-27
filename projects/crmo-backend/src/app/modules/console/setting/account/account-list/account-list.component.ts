import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { AccountService, IAccount, IAccountMinimal } from 'crmo-lib';
import { BaseComponent } from '../../../../base.component';

@Component({
  selector: 'crmo-backend-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent extends BaseComponent implements OnInit {

  //#region Public Variable Declaration 
  public oHash: string;
  public isLoading: boolean = false;

  public listAccounts: IAccountMinimal[] = null;
  public pageRecordsLoaded: number = 0;
  public pageTotalSize: number = 100;  
  //#endregion

  //#region Private Variable Declaration 
  private viewName: string = '*';
  private filterName: string = 'my_all';
  private startAt: number = Globals._LIST_PAGE_DEFAULT_FROM_POSITION;
  private pageSize: number = Globals._LIST_PAGE_DEFAULT_RECORDS_DISPLAYED;
  private isScrollLoading: boolean = false;
  private elemPage: any;
  private scrollId: string = 'abcd';
  private payload: any = null;

  //#endregion

  //#region Constructors
  // Default constructor
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
      private _accountService: AccountService
    ) { super(); }

  //#endregion

  //Default Life cycle Function - Initialize 
  ngOnInit(): void {
    
    this.oHash = this._route.snapshot.paramMap.get('ohash');

    this.fnLoadListData(true);

  }

  //#region Private Methods
  /**
   * Function to load account list
   * @param showLoader
   * @returns nothing
   */
  private fnLoadListData(showLoader: boolean =true)
  {
     //Build the params for passing
     let params: Object = {'key': this.oHash};

    //Calling Account Service to get list of accounts
    this._accountService.get(params)
      .subscribe((response: IAccountMinimal[]) => {
        //Clear leading status
        this.isLoading = false;
        this.isScrollLoading = false;

        let dataArray: IAccountMinimal[] = response;
        if (dataArray && dataArray.length > 0) {
          if (!this.listAccounts) { this.listAccounts = []; }

          //Fill list array
          dataArray.forEach((data: IAccountMinimal) => {
            this.listAccounts.push(data);
          });

          //Set records loaded size
          this.pageRecordsLoaded = (this.listAccounts && this.listAccounts.length > 0) ? this.listAccounts.length : 0;
          if (this.pageRecordsLoaded < 1) {
            this.fnResetPageCounters();
          } //End if
        } 

        //Handle Scroll 
        this.fnAdjustScroll();
        
      }, (error) => {
        //Stop loader
        this.isLoading = false;
        this.isScrollLoading = false;

        throw error;
      });
  }

  /**
   * Reset the page counters
   */
   private fnResetPageCounters(): void {
    //Reset array object
    this.listAccounts = [];

    //Reset variables
    this.pageRecordsLoaded = 0;
    this.pageTotalSize = 0;
    this.startAt = Globals._LIST_PAGE_DEFAULT_FROM_POSITION;
    this.pageSize = Globals._LIST_PAGE_DEFAULT_RECORDS_DISPLAYED;

    this.scrollId = null;
  } //Function ends

   /**
   * Adjust the scroll height
   */
    private fnAdjustScroll() {
      let acc = this.elemPage;
      if (acc && acc.target) {
        //Get event target data
        let offsetHeight: number = acc.target.offsetHeight;
        let scrollHeight: number = acc.target.scrollHeight;
  
        //Calculated Top Value
        let scrollTop = ((Globals._SCROLL_RELOAD_FACTOR) * scrollHeight) - offsetHeight;
  
        acc.target.scrollTop = scrollTop;
      } //End if
    } //Function ends

    //#endregion

//#region Public Methods

public fnShowAccountDtl(account:IAccountMinimal):void{
  try {
    let temp:Globals;
    this.oHash = temp.getSettingInfo().oHash;
    this._router.navigate(['/secure/setting/organization/'+ this.oHash +'/account',account.id]);
  } catch(error) {
    throw error;
  } //Try-catch ends
}
//#endregion

}
