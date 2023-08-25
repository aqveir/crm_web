import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'common-lib';

// Interfaces
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
   * Make a Call to Contact (having the Service Request)
   * 
   * @param _uuid
   * @param _payload
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public makeCall(_uuid: string, _payload: any=null, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('servicerequest/'+_uuid+'/call', _payload, false, _params).subscribe({ 
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
   * Send SMS to Contact (having the Service Request)
   * 
   * @param _uuid
   * @param _payload
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public sendSMS(_uuid: string, _payload: ISendSmsRequest, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('servicerequest/'+_uuid+'/sms', _payload, false, _params).subscribe({ 
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
   * Send Mail/Email to Contact (having the Service Request)
   * 
   * @param _uuid
   * @param _payload
   * @param _params
   * 
   * @returns Observable
   * 
   */
  public sendMail(_uuid: string, _payload: ISendMailRequest, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('servicerequest/'+_uuid+'/mail', _payload, false, _params).subscribe({ 
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
