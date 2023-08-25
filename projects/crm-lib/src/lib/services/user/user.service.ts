import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { ContentType, HttpService } from 'common-lib';
import { BaseService } from '../base.service';

// Interfaces
import { IResponseError } from '../../interfaces/common/response.interface';
import { IUser, IUserMinimal, IUserRequest } from '../../interfaces/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {


  /**
   * Default constructor
   */
  constructor(
    private _httpService: HttpService
  ) { super(); }


  /**
   * Get users for an organization
   * 
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public getAll(_params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('user', false, _params).subscribe({ 
        next: (response: any) => {
          let data: IUserMinimal = response.data;
          observer.next(data);
        }, 
        error: (error: IResponseError) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Get user by identifier for an organization
   * 
   * @param _hash
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public show(_hash: string, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('user/'+_hash, false, _params).subscribe({ 
        next: (response: any) => {
          let data: IUser = response.data;
          observer.next(data);
        }, 
        error: (error: IResponseError) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Get current user information
   * 
   * @returns Observable
   * 
   */
  public profile(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('user/profile').subscribe({ 
        next: (response: any) => {
          let data: any = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Create Organization User
   * 
   * @param _data
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public create(_data: IUserRequest, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('user', _data, false, _params).subscribe({ 
        next: (response: any) => {
          let data: any = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Update Organization User by Identifier
   * 
   * @param _hash
   * @param _data
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public update(_hash: string, _data: IUserRequest, _params: Object|null=null): Observable<any> {

    //Add method to PUT
    if (_params == null) {
      _params = {};
    } //End if
    _params = Object.assign(_params, { '_method': 'PUT' });

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('user/' + _hash, _data, false, _params, ContentType.NOTHING).subscribe({ 
        next: (response: any) => {
          let data: any = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Delete Organization User by Identifier
   * 
   * @param _hash
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public delete(_hash: string, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.delete('user/'+_hash).subscribe({ 
        next: (response: any) => {
          let data: any = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Validate Organization User by Type
   * 
   * @param _params
   * 
   * @returns Observable
   */
  public exists(_params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('user/exists', false, _params).subscribe({ 
        next: (response: any) => {
          let data: any = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends

} //Class ends
