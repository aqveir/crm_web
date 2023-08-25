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

  public _httpService: HttpService|any;

  /**
   * Default constructor
   */
  constructor(
  ) { super(); }


  /**
   * Get List of Service Request
   */
  protected getAll(_payload: any=null, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('servicerequest/fetch', _payload, false, _params).subscribe({ 
        next: (response: any) => {
          let data: IServiceRequestMinimal[] = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Get Organization Preference by Identifier
   */
  public show(id: number, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('preference/'+id.toString()).subscribe({ 
        next: (response: any) => {
          let data: IServiceRequest = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Create Organization Preference Data
   */
  public create(_data: any, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('preference', _data).subscribe({ 
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
   * Update Organization Preference Data by Identifier
   */
  public update(id: number, data: any, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('preference/'+id.toString(), data).subscribe({ 
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
   * Delete Service Request Data by Identifier
   */
  public delete(id: number, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.delete('preference/'+id.toString()).subscribe({ 
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
   * Set Default Params
   * 
   * @param _params 
   * @param _categoryKey 
   */
  protected setDefaultParamsWithPagination(_categoryKey: string, _params: Object|null=null): Object {
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
          _params = Object.assign(_params, { 'category_key': _categoryKey });
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
