import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'common-lib';
import { BaseService } from '../base.service';

import { IServiceRequestMinimal, IServiceRequest } from '../../interfaces/service-request/service-request.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class ServiceRequestService extends BaseService {

  public _httpService: HttpService;

  /**
   * Default constructor
   */
  constructor(
  ) { super(); }


  /**
   * Get List of Service Request
   */
  public getAll(_payload: any=null, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('servicerequest/fetch', _payload, false, _params)
        .then((response: any) => {
          let data: IServiceRequestMinimal[] = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Get Organization Preference by Identifier
   */
  public show(id: number, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('preference/'+id.toString())
        .then((response: any) => {
          let data: IServiceRequest = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Create Organization Preference Data
   */
  public create(data: any, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('preference', data)
        .then((response: any) => {
          let data: any = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Update Organization Preference Data by Identifier
   */
  public update(id: number, data: any, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('preference/'+id.toString(), data)
        .then((response: any) => {
          let data: any = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Delete Service Request Data by Identifier
   */
  public delete(id: number, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.delete('preference/'+id.toString())
        .then((response: any) => {
          observer.next(response);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Set Default Params
   * 
   * @param _params 
   * @param _categoryKey 
   */
  protected setDefaultParamsWithPagination(_categoryKey: string, _params: Object=null): Object {
    let objReturnValue: Object;

    try {
      //Create params, if missing
      if (_params==null) { 
        _params = {
          'category_key': _categoryKey,
        }; 
      } else { 
        //Set category key to fetch data
        if (!(super.hasProperty(_params, 'category_key'))) {
          _params['category_key'] = _categoryKey;
        } //End if
      } //End if

      //Add Pagination params, if missing
      _params = super.setDefaultParamsForPagination(_params);

      //Set Object
      objReturnValue=_params;
    } catch (error) {
      throw error;
    } //try-catch ends

    return objReturnValue;
  } //Function ends

} //Class ends
