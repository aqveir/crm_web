import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'common-lib';
import { ServiceRequestService } from './service-request.service';

@Injectable({
  providedIn: 'root'
})
export class LeadService extends ServiceRequestService {

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
   * Get List of Leads
   */
  public override getAll(_payload: any=null, _params: Object|null=null): Observable<any> {

    //Check default params and set defaults
    _params = this.setDefaultParamsWithPagination('service_request_category_lead', _params);

    return super.getAll(_payload, _params);
  } //Function ends


} //Class ends
