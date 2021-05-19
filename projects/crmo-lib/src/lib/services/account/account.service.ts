import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'ellaisys-lib';
import { BaseService } from '../base.service';
import { IAccountMinimal } from '../../interfaces/account/account.interface';


@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService{

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
   * Get List of Accounts
   */
   public getAll(_params: Object=null): Observable<any> {
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
  } //Function ends
}
