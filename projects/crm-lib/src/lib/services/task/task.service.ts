import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'common-lib';
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
   * 
   * @param _payload
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public getAll(_payload: any=null, _params: Object|null=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('task/fetch', _payload, false, _params).subscribe({ 
        next: (response: any) => {
          let data: ITaskMinimal = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Create Task for Service Request
   * 
   * @param _payload
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public create(_payload: ITaskRequest|null=null, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('task', _payload, false, _params).subscribe({ 
        next: (response: any) => {
          let data: ITask = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Update Task for Service Request
   * 
   * @param _uuid
   * @param _payload
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public update(_uuid: string, _payload: ITaskRequest|null=null, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('task/'+_uuid, _payload, _params).subscribe({ 
        next: (response: any) => {
          let data: ITask = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Update Task (Mark Complete) for Service Request
   * 
   * @param _uuid
   * @param _payload
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public markComplete(_uuid: string, _payload: ITaskRequest|null=null, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('task/'+_uuid+'/complete', _payload, _params).subscribe({ 
        next: (response: any) => {
          let data: ITask = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends

} //Class ends
