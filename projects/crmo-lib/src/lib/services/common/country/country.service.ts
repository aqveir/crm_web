import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService,ContentType } from 'ellaisys-lib';
import { ICountry } from '../../../interfaces/common/country.interface';
import { BaseService } from '../../base.service';
import { IBaseInterface } from '../../base.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseService implements IBaseInterface {

  constructor(
    private _httpService: HttpService
  ) { 
    super();  
  }

  //#region IBaseInterface implementation

public  get(_params: Object=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.get('meta/country', _params)
        .then((response: any) => {
          let data: ICountry[] = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  }

  getByHash(_hash: string, _params: Object): Observable<any> {
    throw new Error('Method not implemented.');
  }

  //#endregion
}
