import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'common-lib';
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
   * 
   * @param _payload
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public getAll(_payload: any=null, _params: any=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('event/fetch', _payload, false, _params).subscribe({ 
        next: (response: any) => {
          let data: IEventMinimal[] = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Create Event for Service Request
   * 
   * @param _payload
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public create(_payload: IEventRequest, _params: any=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('event', _payload, false, _params).subscribe({ 
        next: (response: any) => {
          let data: IEvent = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Update Event for Service Request
   * 
   * @param _uuid
   * @param _payload
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public update(_uuid: string, _payload: IEventRequest, _params: Object): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('event/'+_uuid, _payload, _params).subscribe({ 
        next: (response: any) => {
          let data: IEvent = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends

} //Class ends