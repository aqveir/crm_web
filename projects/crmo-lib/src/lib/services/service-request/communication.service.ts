import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'ellaisys-lib';
import { BaseService } from '../base.service';
import { ISendMailRequest, ISendSmsRequest } from '../../interfaces/service-request/communication.interface';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService extends BaseService {

  /**
   * Default constructor
   */
  constructor(
    private _httpService: HttpService
  ) { super(); }


  /**
   * Send SMS to Contact (having the Service Request)
   */
  public sendSMS(srhash: string, _payload: ISendSmsRequest=null, _params: Object=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('servicerequest/'+srhash+'/sms', _payload, false, _params)
        .then((response: any) => {
          let data: any = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Send Mail/Email to Contact (having the Service Request)
   */
  public sendMail(srhash: string, _payload: ISendMailRequest=null, _params: Object=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('servicerequest/'+srhash+'/mail', _payload, false, _params)
        .then((response: any) => {
          let data: any = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends

} //Class ends
