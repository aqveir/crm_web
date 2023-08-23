import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

//Framework files
import { HttpService } from 'common-lib';
import { BaseService } from '../../base.service';

// Interfaces
import { IRole } from '../../../interfaces/common/role.interface';


@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService {


  /**
   * Default constructor
   */
  constructor(
    private _httpService: HttpService
  ) { super(); }


  /**
   * Get List of Organization Roles
   */
  public getAll(_params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('role', _params)
        .then((response: any) => {
          let data: IRole[] = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Get Role by Key Identifier
   */
  public show(key: string, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('role/'+key)
        .then((response: any) => {
          let data: IRole = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Create Role Data
   */
  public create(data: IRole, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('role', data)
        .then((response: any) => {
          let data: IRole = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Update Role Data by Key Identifier
   */
  public update(key: string, data: IRole, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('role/'+key, data)
        .then((response: any) => {
          let data: IRole = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Delete Role Data by Key Identifier
   */
  public delete(key: string, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.delete('role/'+key)
        .then((response: any) => {
          observer.next(response);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends

} //Class ends
