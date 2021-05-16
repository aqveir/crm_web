import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'ellaisys-lib';
import { BaseService } from '../base.service';
import { ITaskMinimal } from '../../interfaces/service-request/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService  extends BaseService {

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

} //Class ends
