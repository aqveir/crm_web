import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'ellaisys-lib';
import { BaseService } from '../base.service';

// Interfaces
import { IResponseError } from '../../interfaces/common/response.interface';
import { IUser, IUserMinimal, IUserRequest } from '../../interfaces/user/user.interface';

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
  public getAll(_params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('user', _params)
        .then((response: any) => {
          let data: IUserMinimal = response.data;

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
  public show(uHash: string, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('user/' + uHash, _params)
        .then((response: any) => {
          let data: IUser = response.data;

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
  public profile(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('user/profile')
        .then((response: any) => {
          observer.next(response);
        })
        .catch((error: IResponseError) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Create Organization User
   */
  public create(data: IUserRequest, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('user', data)
        .then((response: any) => {
          let data: any = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Update Organization User by Identifier
   */
  public update(uHash: string, data: IUserRequest, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('user/' + uHash, data, _params)
        .then((response: any) => {
          let data: any = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Delete Organization User by Identifier
   */
  public delete(uHash: string, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.delete('user/' + uHash)
        .then((response: any) => {
          observer.next(response);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Validate Organization User by Type
   */
  public exists(_params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('user/exists', _params)
        .then((response: any) => {
          observer.next(response);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends

} //Class ends
