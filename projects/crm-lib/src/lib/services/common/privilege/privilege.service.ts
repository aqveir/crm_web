import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

//Framework files
import { HttpService } from 'common-lib';
import { BaseService } from '../../base.service';
import { IPrivilege } from '../../../interfaces/common/privilege.interface';


@Injectable({
  providedIn: 'root'
})
export class PrivilegeService extends BaseService {


  /**
   * Default constructor
   */
  constructor(
    private _httpService: HttpService
  ) { super(); }


  /**
   * Get List of Application Privileges
   * 
   * @param _params
   * 
   * @returns Observable<any>
   * 
   */
  public getAll(_params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('privilege', false, _params).subscribe({ 
        next: (response: any) => {
          let data: IPrivilege[] = response.data;

          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends

} //Class ends
