import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'ellaisys-lib';
import { ServiceRequestService } from './service-request.service';

@Injectable({
  providedIn: 'root'
})
export class SupportService extends ServiceRequestService {

  /**
   * Default constructor
   */
  constructor(
    private httpService: HttpService
    ) { 
      super(); 
      super._httpService = httpService;
    }


  /**
   * Get List of Support Requests
   */
  public getAll(_payload: any=null, _params: Object=null): Observable<any> {

    //Check default params and set defaults
    _params = this.setDefaultParams('service_request_category_support', _params);

    return super.getAll(_payload, _params);
  } //Function ends


} //Class ends
