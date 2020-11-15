import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpParams } from '@angular/common/http';

//Framework files
import { HttpService } from 'ellaisys-lib';
import { BaseService } from '../base.service';
import { IOrganization } from '../../interfaces/organization/organization.interface';

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
          observer.next(response);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Get Organizations by Hash Identifier
   */
  public show(hash: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._httpService.get('organization/'+hash)
        .then((response: any) => {
          observer.next(response);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Update Organization Data by Hash Identifier
   */
  public update(hash: string, data: IOrganization): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._httpService.put('organization/'+hash, data)
        .then((response: any) => {
          observer.next(response);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends

} //Class ends
