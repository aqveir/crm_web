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
   * Get Payment Method for the Organization
   */
   public getAll(_payload: any=null, _params: Object=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('organization/paymentmethods/fetch', _payload, false, _params)
        .then((response: any) => {
          let data: IPaymentMethod[] = response.data;
          observer.next(data); 
        })                          
        .catch((error: any) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends

} //Class ends
