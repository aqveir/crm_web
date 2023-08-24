import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService, ContentType, LocalStorageService } from 'common-lib';
import { ICountry } from '../../../interfaces/common/country.interface';
import { BaseService } from '../../base.service';
import { IBaseInterface } from '../../base.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseService implements IBaseInterface {


  /**
   * Default constructor
   */
  constructor(
    private _httpService: HttpService,
    private _localStorageService: LocalStorageService,
  ) { super(); }

  /**
   * Get List of Country Data
   * 
   * @param _params
   * 
   * @returns Observable<any>
   * 
   */
  public  get(_params: any=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.get('meta/country', _params).subscribe({ 
        next: (response: any) => {
          let data: ICountry[] = response.data;

          //Store the data into the local storage
          this._localStorageService.setItem('_LOCAL_STORAGE_COUNTRY_DATA', data);

          observer.next(data); 
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends

  
  /**
   * Get Country by Hash Identifier
   * 
   * @param _hash
   * @param _params
   * 
   * @returns Observable<any>
   * 
   **/
  getByHash(_hash: string, _params: Object): Observable<any> {
    throw new Error('Method not implemented.');
  } //Function ends

} //Class ends
