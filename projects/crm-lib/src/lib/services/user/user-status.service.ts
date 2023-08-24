import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'common-lib';
import { BaseService } from '../base.service';

// Interfaces
import { IResponseError } from '../../interfaces/common/response.interface';
import { IUserStatusResponse } from '../../interfaces/user/user-status.interface';

@Injectable({
  providedIn: 'root'
})
export class UserStatusService extends BaseService {

  //Default Constructor
  constructor(
    private _httpService: HttpService
  ) { super(); }


  /**
   * Get current user status
   */
  public get(_params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('user/status', _params)
        .then((response: any) => {
          let data: IUserStatusResponse = response.data;

          //Set observer state
          observer.next(data);
        })
        .catch((error: IResponseError) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Set current user status
   */
  public set(statusKey: string, data: any=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('user/status/' + statusKey, data)
        .then((response: any) => {
          let data: any = response.data;

          //Set observer state
          observer.next(data);
        })
        .catch((error: IResponseError) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends

} //Class ends

