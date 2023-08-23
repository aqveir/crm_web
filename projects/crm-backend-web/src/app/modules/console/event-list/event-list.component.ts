import { Component, HostListener, OnInit } from '@angular/core';

//Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../base.component';
import { EventBrokerService } from 'common-lib';
import { IEventMinimal, EventService } from 'crmo-lib';


@Component({
  selector: 'crmo-backend-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent extends BaseComponent implements OnInit {
  //Common attributes
  public isLoading: boolean = false;

  public listEvent: IEventMinimal[] = null;
  public pageRecordsLoaded: number = 0;
  public pageTotalSize: number = 100;  

  private viewName: string = '*';
  private filterName: string = 'my_all';
  private pageFrom: number = Globals._LIST_PAGE_DEFAULT_FROM_POSITION;
  private pageSize: number = Globals._LIST_PAGE_DEFAULT_RECORDS_DISPLAYED;
  private isScrollLoading: boolean = false;
  private elemPage: any;
  private scrollId: string = 'abcd';
  private payload: any = null;
  

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _eventService: EventService,
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
    this.fnLoadListData();
  } //Function ends


  /**
   * Load the listing data from the server
   * 
   * @param showLoader 
   */
  private fnLoadListData(showLoader: boolean = true): void {
    //Page view, position and size
    let pageFrom: string = (this.pageFrom > 0) ? this.pageFrom.toString() : '1';
    let pageSize: string = (this.pageSize > 0) ? this.pageSize.toString() : '10';

    //Set loading status
    this.isLoading = showLoader;
    this.isScrollLoading = true;

    //Build Params
    let params: Object = {
      'view': this.viewName,
      'filter': this.filterName,
      'page': pageFrom,
      'size': pageSize,
    };

    //Fetch data from server
    this._eventService.getAll(this.payload, params)
      .subscribe((response: IEventMinimal[]) => {
        //Clear leading status
        this.isLoading = false;
        this.isScrollLoading = false;

        let dataArray: IEventMinimal[] = response;
        if (dataArray && dataArray.length > 0) {
          if (!this.listEvent) { this.listEvent = []; }

          //Fill list array
          dataArray.forEach((data: IEventMinimal) => {
            this.listEvent.push(data);
          });

          //Set records loaded size
          this.pageRecordsLoaded = (this.listEvent && this.listEvent.length > 0) ? this.listEvent.length : 0;
          if (this.pageRecordsLoaded < 1) {
            this.fnResetPageCounters();
          } //End if
        } else {
          //this.fnResetPageCounters();
        } //End If

        //Handle Scroll 
        this.fnAdjustScroll();
      }, (error) => {
        //Stop loader
        this.isLoading = false;
        this.isScrollLoading = false;

        throw error;
      });
  } //Function ends


  /**
   * Open Modal for SMS and Mail
   * 
   * @param event 
   * @param key 
   * @param task 
   */
  public fnOpenModal(event, key: string, task: IEventMinimal): void {
    this._broker.emit(key, task?.servicerequest);
    event.stopPropagation();
  } //Function ends


  public fnSortColumn(columnName: string, sortDir: string): void {

  } //Function ends


  /**
   *   Handle Scrolling List
   */
  @HostListener('window:scroll', ['$event'])
  onScroll(elem: any) {
    this.elemPage = elem;

    if (!this.isScrollLoading) {
      if (this.pageTotalSize > this.pageFrom) {
        //Get event target data
        let scrollTop: number = (document.documentElement.scrollTop || document.body.scrollTop);
        let offsetHeight: number = document.documentElement.offsetHeight;
        let scrollHeight: number = document.documentElement.scrollHeight;

        //Calculate scroll ratio
        let scrollRatio: number = (scrollTop + offsetHeight) / scrollHeight;

        //Trigger the event based on scroll factor
        if (scrollRatio > (Globals._SCROLL_RELOAD_FACTOR)) {
          if (this.scrollId) {
            this.pageFrom ++;
            this.fnLoadListData(true);
          } //End if
        } //End If
      } //End If
    } //End if
  } // Function Ends


  /**
   * Adjust the scroll height
   */
  private fnAdjustScroll() {
    let event = this.elemPage;
    if (event && event.target) {
      //Get event target data
      let offsetHeight: number = event.target.offsetHeight;
      let scrollHeight: number = event.target.scrollHeight;

      //Calculated Top Value
      let scrollTop = ((Globals._SCROLL_RELOAD_FACTOR) * scrollHeight) - offsetHeight;

      event.target.scrollTop = scrollTop;
    } //End if
  } //Function ends


  /**
   * Reset the page counters
   */
  private fnResetPageCounters(): void {
    //Reset array object
    this.listEvent = [];

    //Reset variables
    this.pageRecordsLoaded = 0;
    this.pageTotalSize = 0;
    this.pageFrom = Globals._LIST_PAGE_DEFAULT_FROM_POSITION;
    this.pageSize = Globals._LIST_PAGE_DEFAULT_RECORDS_DISPLAYED;

    this.scrollId = null;
  } //Function ends

  //TODO: Delete/Replan
  public fnShowTaskModal(event, task: IEventMinimal): void {
    this._broker.emit('show_task_modal', [task?.servicerequest, task, (()=>{
      
    })]);
    event.stopPropagation();
  }

} //Class ends