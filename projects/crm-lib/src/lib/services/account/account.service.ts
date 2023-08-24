import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService,ContentType } from 'common-lib';
import { BaseService } from '../base.service';
import { IAccountMinimal,IAccount, IAccountRequest } from '../../interfaces/account/account.interface';
import { IBaseInterface }  from '../base.interface';


@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService implements IBaseInterface {


  /**
   * Default constructor
   */
   constructor(
    private _httpService: HttpService
  ) { super(); }
  

  /**
   * Get All the records for the entity
   * 
   * @param _params Object
   * 
   * @returns Observable<any>
   * 
   */
  public get(_params: Object|null=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.get('account', false, _params).subscribe({ 
        next: (response: any) => {
          let data: IAccountMinimal[] = response.data;

          observer.next(data); 
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Get Account by Identifier
   * 
   * @param _hash string
   * @param _params Object
   * 
   * @returns Observable<any>
   * 
   */
  public getByHash(_hash:string, _params: Object|null=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.get('account/'+_hash, false, _params).subscribe({ 
        next: (response: any) => {
          let data: IAccountMinimal[] = response.data;
          observer.next(data); 
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Create Account 
   * 
   * @param _account IAccountRequest
   * @param _params Object
   * 
   * @returns Observable<any>
   * 
   */
  public create(data:IAccountRequest, _params: Object|null=null):Observable<any>{

    if (_params == null) {
      _params = {};
    } //End if
    _params = Object.assign(_params, { '_method': 'POST' });

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('account/', data, false, _params, ContentType.NOTHING).subscribe({ 
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
   * Update Account Details
   * 
   * @param hash string
   * @param _account IAccountRequest
   * @param _params Object
   * 
   * @returns Observable<any>
   * 
   */
  public update(hash: string, data:IAccountRequest, _params: Object|null=null):Observable<any>{

    if (_params == null) {
      _params = {};
    } //End if
    _params = Object.assign(_params, { '_method': 'PUT' });

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('account/' + hash, data, false, _params, ContentType.NOTHING).subscribe({ 
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
