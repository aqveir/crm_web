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


  /**
   * Default constructor
   */
  constructor(
    private _httpService: HttpService
  ) { super(); }


  /**
   * Get current user status
   * 
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public get(_params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('user/status', false, _params).subscribe({ 
        next: (response: any) => {
          let data: IUserStatusResponse = response.data;
          observer.next(data);
        }, 
        error: (error: IResponseError) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Set current user status
   * 
   * @param _statusKey
   * 
   * @returns Observable
   * 
   */
  public set(_statusKey: string, _data: any=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('user/status/'+_statusKey, _data)
      .subscribe({ 
        next: (response: any) => {
          let data: any = response.data;
          observer.next(data);
        }, 
        error: (error: IResponseError) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends

} //Class ends

