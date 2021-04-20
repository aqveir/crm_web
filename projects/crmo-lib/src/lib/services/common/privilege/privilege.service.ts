import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

//Framework files
import { HttpService } from 'ellaisys-lib';
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
   */
  public getAll(_params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('privilege', _params)
        .then((response: any) => {
          let data: IPrivilege[] = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends

} //Class ends
