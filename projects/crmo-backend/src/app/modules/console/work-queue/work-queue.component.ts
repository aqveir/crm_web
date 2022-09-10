import { Component, OnInit } from '@angular/core';

//Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { TaskService, ITaskMinimal } from 'crmo-lib';
import { BaseComponent } from '../../base.component';
import { EventBrokerService } from 'ellaisys-lib';

@Component({
  selector: 'crmo-backend-work-queue',
  templateUrl: './work-queue.component.html',
  styleUrls: ['./work-queue.component.scss']
})
export class WorkQueueComponent extends BaseComponent implements OnInit {

  public objQueueData: any = {
    'requests': [],
    'task_events': [
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_medium'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}},
      {type:{key:'entity_type_event_calendar'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_medium'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_low'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}},
      {type:{key:'entity_type_event_calendar'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_low'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_medium'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_low'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}},
      {type:{key:'entity_type_event_calendar'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_low'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_medium'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_low'}},
      {type:{key:'entity_type_event_calendar'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_medium'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}},
      {type:{key:'entity_type_event_calendar'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_medium'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_low'}},
      {type:{key:'entity_type_event_task'}, priority:{key:'common_priority_high'}}
    ]
  }
  

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _taskService: TaskService,
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
    // //Page view, position and size
    // let pageFrom: string = (this.pageFrom > 0) ? this.pageFrom.toString() : '1';
    // let pageSize: string = (this.pageSize > 0) ? this.pageSize.toString() : '10';

    // //Set loading status
    // this.isLoading = showLoader;
    // this.isScrollLoading = true;

    // //Build Params
    // let params: Object = {
    //   'view': this.viewName,
    //   'filter': this.filterName,
    //   'page': pageFrom,
    //   'size': pageSize,
    // };

    // //Fetch data from server
    // this._taskService.getAll(this.payload, params)
    //   .subscribe((response: ITaskMinimal[]) => {
    //     //Clear leading status
    //     this.isLoading = false;
    //     this.isScrollLoading = false;

    //     let dataArray: ITaskMinimal[] = response;
    //     if (dataArray && dataArray.length > 0) {
    //       if (!this.listTask) { this.listTask = []; }

    //       //Fill list array
    //       dataArray.forEach((data: ITaskMinimal) => {
    //         this.listTask.push(data);
    //       });

    //       //Set records loaded size
    //       this.pageRecordsLoaded = (this.listTask && this.listTask.length > 0) ? this.listTask.length : 0;
    //       if (this.pageRecordsLoaded < 1) {
    //         this.fnResetPageCounters();
    //       } //End if
    //     } else {
    //       //this.fnResetPageCounters();
    //     } //End If

    //     //Handle Scroll 
    //     this.fnAdjustScroll();
    //   }, (error) => {
    //     //Stop loader
    //     this.isLoading = false;
    //     this.isScrollLoading = false;

    //     throw error;
    //   });
  } //Function ends


  /**
   * Open Modal for SMS and Mail
   * 
   * @param event 
   * @param key 
   * @param task 
   */
  public fnOpenModal(event, key: string, task: ITaskMinimal): void {
    this._broker.emit(key, task?.servicerequest);
    event.stopPropagation();
  } //Function ends

} //Class ends
