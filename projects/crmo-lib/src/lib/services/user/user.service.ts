import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'ellaisys-lib';
import { BaseService } from '../base.service';

// Interfaces
import { IResponseError } from '../../interfaces/common/response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  //Default Constructor
  constructor(
    private _httpService: HttpService
  ) { super(); }


  /**
   * Get users for an organization
   */
  public getUsers(oHash: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._httpService.get('organization/' + oHash + '/user')
        .then((response: any) => {
          let data: any = response.data;

          //Set observer state
          observer.next(data);
        })
        .catch((error: IResponseError) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Get user by identifier for an organization
   */
  public getUserByIdentifier(oHash: string, uHash: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._httpService.get('organization/' + oHash + '/user/' + uHash)
        .then((response: any) => {
          let data: any = response.data;

          //Set observer state
          observer.next(data);
        })
        .catch((error: IResponseError) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Get current user information
   */
  public show(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._httpService.get('user')
        .then((response: any) => {
          observer.next(response);
        })
        .catch((error: IResponseError) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends

} //Class ends
