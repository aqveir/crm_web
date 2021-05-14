import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'ellaisys-lib';
import { ServiceRequestService } from './service-request.service';

@Injectable({
  providedIn: 'root'
})
export class OpportunityService extends ServiceRequestService {

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
   * Get List of Opportunities
   */
  public getAll(_payload: any=null, _params: Object=null): Observable<any> {

    //Check default params and set defaults
    _params = this.setDefaultParams('service_request_category_opportunity', _params);

    return super.getAll(_payload, _params);
  } //Function ends


} //Class ends
