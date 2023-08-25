import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'common-lib';
import { BaseService } from '../base.service';

// Interfaces
import { IPaymentMethod } from '../../interfaces/subscription/payment-method.interface';


@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService extends BaseService {


  /**
   * Default constructor
   */
  constructor(
    private _httpService: HttpService
  ) { super(); }


  /**
   * Get Payment Methods for the Organization
   * 
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public getAll(_params: any=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.get('organization/paymentmethod/fetch', _params).subscribe({ 
        next: (response: any) => {
          let data: IPaymentMethod[] = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Create Payment Method for the Organization
   * 
   * @param _data
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public create(_data: any, _params: any=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('organization/paymentmethod', _data, false, _params).subscribe({ 
        next: (response: any) => {
          let data: IPaymentMethod = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Update Payment Method for the Organization
   * 
   * @param _uuid
   * @param _data
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public update(_uuid: string, _data: any, _params: any=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('organization/paymentmethod/'+_uuid, _data, _params).subscribe({ 
        next: (response: any) => {
          let data: IPaymentMethod = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Delete Payment Method for the Organization
   * 
   * @param _cardUuid
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public delete(_uuid: string, _params: any=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.delete('organization/paymentmethod/'+_uuid, _params).subscribe({ 
        next: (response: any) => {
          let data: IPaymentMethod = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Get Setup Intent for the Organization
   * 
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public getSetupIntent(_params: any=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('organization/paymentmethod/intent', _params).subscribe({ 
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
