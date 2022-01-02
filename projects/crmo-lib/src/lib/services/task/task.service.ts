import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'ellaisys-lib';
import { BaseService } from '../base.service';
import { ITask, ITaskMinimal, ITaskRequest } from '../../interfaces/service-request/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService {

  /**
   * Default constructor
   */
  constructor(
    private _httpService: HttpService
  ) { 
    super(); 
    //super.httpService = _httpService;
  }

  
  /**
   * Get List of Tasks
   */
  public getAll(_payload: any=null, _params: Object=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('task/fetch', _payload, false, _params)
        .then((response: any) => {
          let data: ITaskMinimal[] = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Create Task for Service Request
   */
  public create(_payload: ITaskRequest=null, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('task', _payload, false, _params)
        .then((response: any) => {
          let data: ITask = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Update Task for Service Request
   */
  public update(id: number, _payload: ITaskRequest=null, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('task/'+id, _payload, _params)
        .then((response: any) => {
          let data: ITask = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Update Task (Mark Complete) for Service Request
   */
  public markComplete(id: number, _payload: ITaskRequest=null, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('task/'+id+'/complete', _payload, _params)
        .then((response: any) => {
          let data: ITask = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends

} //Class ends
