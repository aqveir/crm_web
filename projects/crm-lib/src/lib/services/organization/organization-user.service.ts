import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'common-lib';
import { BaseService } from '../base.service';

// Interfaces
import { IResponseError } from '../../interfaces/common/response.interface';
import { IUser } from '../../interfaces/user/user.interface';

// Models


@Injectable({
  providedIn: 'root'
})
export class OrganizationUserService extends BaseService {

  //Default Constructor
  constructor(
    private _httpService: HttpService
  ) { super(); }


  /**
   * Get All Users for an Organization
   * 
   * @param  _oHash  string
   */
  public getAll(_oHash: string): Observable<any> {

    return new Observable((observer: Observer<any>) => {
      this._httpService.get('organization/' + _oHash + '/user').subscribe({ 
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
   * Get a single user data for an organiztion
   * 
   */
  public show(_oHash: string, _uHash: string): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('organization/' + _oHash + '/user/' + _uHash).subscribe({ 
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
   * Create new user for an organization
   * 
   */
  public create(_oHash: string, data: IUser): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('organization/' + _oHash + '/user', data).subscribe({ 
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
   * Update the user data for an organiztion
   * 
   */
  public update(_oHash: string, _uHash: string, _data: IUser): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('organization/' + _oHash + '/user/' + _uHash, _data).subscribe({ 
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
   * Delete the user record for an organiztion
   * 
   */
  public delete(_oHash: string, _uHash: string): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.delete('organization/' + _oHash + '/user/' + _uHash).subscribe({ 
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

