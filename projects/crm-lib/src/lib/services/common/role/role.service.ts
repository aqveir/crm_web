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
   * 
   * @param _params
   * 
   * @returns Observable<any>
   * 
   */
  public getAll(_params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('role', false, _params).subscribe({ 
        next: (response: any) => {
          let data: IRole[] = response.data;

          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Get Role by Key Identifier
   * 
   * @param key
   * @param _params
   * 
   * @returns Observable<any>
   * 
   */
  public show(key: string, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('role/'+key).subscribe({ 
        next: (response: any) => {
          let data: IRole = response.data;

          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Create Role Data
   * 
   * @param data
   * @param _params
   * 
   * @returns Observable<any>
   * 
   */
  public create(data: IRole, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('role', data).subscribe({ 
        next: (response: any) => {
          let data: IRole = response.data;

          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Update Role Data by Key Identifier
   * 
   * @param key
   * @param data
   * @param _params
   * 
   * @returns Observable<any>
   * 
   */
  public update(key: string, data: IRole, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('role/'+key, data).subscribe({ 
        next: (response: any) => {
          let data: IRole = response.data;

          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Delete Role Data by Key Identifier
   * 
   * @param key
   * @param _params
   * 
   * @returns Observable<any>
   * 
   */
  public delete(key: string, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.delete('role/'+key).subscribe({ 
        next: (response: any) => {
          observer.next(response);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends

} //Class ends
