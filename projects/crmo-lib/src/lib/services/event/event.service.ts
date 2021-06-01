import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'ellaisys-lib';
import { BaseService } from '../base.service';
import { IEvent, IEventMinimal, IEventRequest } from '../../interfaces/service-request/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseService {

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
   * Get List of Events
   */
  public getAll(_payload: any=null, _params: Object=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('event/fetch', _payload, false, _params)
        .then((response: any) => {
          let data: IEventMinimal[] = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Create Event for Service Request
   */
  public create(_payload: IEventRequest=null, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('event', _payload, false, _params)
        .then((response: any) => {
          let data: IEvent = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Update Event for Service Request
   */
  public update(id: number, _payload: IEventRequest=null, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('event/'+id, _payload, _params)
        .then((response: any) => {
          let data: IEvent = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends

} //Class ends