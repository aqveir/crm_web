import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

//Framework files
import { ContentType, HttpService } from 'ellaisys-lib';
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
   */
  public get(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._httpService.get('organization')
        .then((response: any) => {
          let data: IOrganizationMinimal[] = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Get Organizations by Hash Identifier
   */
  public show(hash: string, _params: Object=null): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._httpService.get('organization/'+hash, _params)
        .then((response: any) => {
          let data: IOrganization = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Create Organization Data
   */
  public create(data: IOrganizationRequest, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('organization', data, false, _params, ContentType.NOTHING)
        .then((response: any) => {
          let data: any = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Update Organization Data by Hash Identifier
   */
  public update(oHash: string, data: IOrganizationRequest, _params: Object=null): Observable<any> {

    if (_params == null) {
      _params = {};
    } //End if
    _params['_method'] = 'PUT';

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('organization/'+oHash, data, false, _params, ContentType.NOTHING)
        .then((response: any) => {
          let data: any = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Update Organization Data by Hash Identifier
   */
  public delete(oHash: string, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.delete('organization/'+oHash, _params)
        .then((response: any) => {
          let data: any = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends

} //Class ends
