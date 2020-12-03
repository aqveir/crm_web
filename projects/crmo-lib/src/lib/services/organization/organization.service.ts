import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpParams } from '@angular/common/http';

//Framework files
import { HttpService } from 'ellaisys-lib';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends BaseService {

  //Default Constructor
  constructor(
    private _httpService: HttpService
  ) { super(); }


  public getOrganizations(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._httpService.get('organization')
        .then((response: any) => {
          observer.next(response);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends

} //Class ends
