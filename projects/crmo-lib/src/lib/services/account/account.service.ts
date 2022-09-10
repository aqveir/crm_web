import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService,ContentType } from 'ellaisys-lib';
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
  ) { 
    super();     
  }
  

  //#region IBaseInterface Implementation

  /**
   * Get All the records for the entity
   */
  public get(_params: Object=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.get('account', _params)
        .then((response: any) => {
          let data: IAccountMinimal[] = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  }

  /**
   * Get List of Accounts
   */
  public getByHash(_hash:string,_params: Object=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.get('account/'+_hash, _params)
        .then((response: any) => {
          let data: IAccountMinimal[] = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends

  //#endregion
  
  /**
   * Update Account Details
   */
  public fnUpdate(_account:IAccountRequest, _params: Object=null):Observable<any>{

    if (_params == null) {
      _params = {};
    } //End if
    _params['_method'] = 'PUT';

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('account/'+_account.hash, _account, false, _params, ContentType.NOTHING)
        .then((response: any) => {
          let data: any = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
    
  }


    /**
   * Create Account 
   */
     public fnCreate(_account:IAccountRequest, _params: Object=null):Observable<any>{

      if (_params == null) {
        _params = {};
      } //End if
      _params['_method'] = 'POST';
  
      return new Observable((observer: Observer<any>) => {
        this._httpService.post('account/', _account, false, _params, ContentType.NOTHING)
          .then((response: any) => {
            let data: any = response.data;
  
            observer.next(data);
          })
          .catch((error: any) =>  { observer.error(error); })
          .finally()
      });
      
    }
}
