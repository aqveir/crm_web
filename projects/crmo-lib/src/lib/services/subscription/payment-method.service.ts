import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'ellaisys-lib';
import { BaseService } from '../base.service';

// Interfaces
import { IPaymentMethod } from '../../interfaces/subscription/payment-method.interface';


@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService extends BaseService {

  //Default Constructor
  constructor(
    private _httpService: HttpService
  ) { super(); }


  /**
   * Get Payment Methods for the Organization
   */
   public getAll(_params: Object=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.get('organization/paymentmethod/fetch', _params)
        .then((response: any) => {
          let data: IPaymentMethod[] = response.data;
          observer.next(data); 
        })                          
        .catch((error: any) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Create Payment Method for the Organization
   */
   public create(_data: any, _params: Object=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('organization/paymentmethod', _data, false, _params)
        .then((response: any) => {
          let data: IPaymentMethod = response.data;
          observer.next(data); 
        })                          
        .catch((error: any) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Delete Payment Method for the Organization
   */
   public delete(_cardUuid: string, _params: Object=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.delete('organization/paymentmethod/'+_cardUuid, _params)
        .then((response: any) => {
          let data: IPaymentMethod = response.data;
          observer.next(data); 
        })                          
        .catch((error: any) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Get Setup Intent for the Organization
   */
   public getSetupIntent(_params: Object=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.get('organization/paymentmethod/intent', _params)
        .then((response: any) => {
          let data: any = response.data;
          observer.next(data); 
        })                          
        .catch((error: any) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends

} //Class ends
