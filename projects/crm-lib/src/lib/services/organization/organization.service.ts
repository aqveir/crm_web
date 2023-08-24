import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

//Framework files
import { ContentType, HttpService } from 'common-lib';

//Services
import { BaseService } from '../base.service';
import { IOrganization, IOrganizationMinimal, IOrganizationRequest } from '../../interfaces/organization/organization.interface';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends BaseService {

  
  /**
   * Default constructor
   */
  constructor(
    private _httpService: HttpService
  ) { super(); }


  /**
   * Get List of Organizations
   * 
   * @param _payload Object
   * @param _params Object
   * 
   * @returns Observable<any>
   * 
   */
  public getAll(_payload: any=null, _params: Object|null=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.get('organization').subscribe({ 
        next: (response: any) => {
          let data: IOrganization[] = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Get Organization by Hash Identifier
   * 
   * @param _hash string
   * @param _params Object
   * 
   * @returns Observable<any>
   * 
   */
  public show(_hash: string, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('organization/'+_hash, false, _params).subscribe({ 
        next: (response: any) => {
          let data: IOrganization = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Create Organization Data
   * 
   * @param _data IOrganizationRequest
   * @param _params Object
   * 
   * @returns Observable<any>
   * 
   */
  public create(_data: IOrganizationRequest, _params: Object|null=null): Observable<any> {
    
    if (_params == null) {
      _params = {};
    } //End if
    _params = Object.assign(_params, { '_method': 'POST' });

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('organization', _data, false, _params, ContentType.NOTHING).subscribe({ 
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
   * Update Organization Data by Hash Identifier
   * 
   * @param _hash string
   * @param _data IOrganizationRequest
   * @param _params Object
   * 
   * @returns Observable<any>
   * 
   */
  public update(_hash: string, _data: IOrganizationRequest, _params: Object|null=null): Observable<any> {

    if (_params == null) {
      _params = {};
    } //End if
    _params = Object.assign(_params, { '_method': 'PUT' });

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('organization/'+_hash, _data, false, _params, ContentType.NOTHING).subscribe({ 
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
   * Delete Organization by Hash Identifier
   * 
   * @param _hash string
   * @param _data IOrganizationRequest
   * 
   * @returns Observable<any>
   * 
   */
  public delete(_hash: string, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.delete('organization/'+_hash, _params).subscribe({ 
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
