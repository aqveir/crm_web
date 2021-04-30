import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'ellaisys-lib';
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
   * @param  oHash  string
   */
  public getAll(oHash: string): Observable<any> {

    return Observable.create((observer: Observer<any>) => {
      this._httpService.get('organization/' + oHash + '/user')
        .then((response: any) => {
          let data: any = response.data;

          observer.next(data);
        })
        .catch((error: IResponseError) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Get a single user data for an organiztion
   * 
   */
  public show(oHash: string, uHash: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._httpService.get('organization/' + oHash + '/user/' + uHash)
        .then((response: any) => {
          let data: any = response.data;

          observer.next(response);
        })
        .catch((error: IResponseError) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Create new user for an organization
   * 
   */
  public create(oHash: string, data: IUser): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._httpService.post('organization/' + oHash + '/user', data)
        .then((response: any) => {
          let data: any = response.data;

          observer.next(response);
        })
        .catch((error: IResponseError) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Update the user data for an organiztion
   * 
   */
  public update(oHash: string, uHash: string, data: IUser): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._httpService.put('organization/' + oHash + '/user/' + uHash, data)
        .then((response: any) => {
          let data: any = response.data;

          observer.next(response);
        })
        .catch((error: IResponseError) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends



  /**
   * Delete the user record for an organiztion
   * 
   */
  public delete(oHash: string, uHash: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._httpService.delete('organization/' + oHash + '/user/' + uHash)
        .then((response: any) => {
          let data: any = response.data;

          observer.next(response);
        })
        .catch((error: IResponseError) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends

} //Class ends

