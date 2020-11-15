import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

//Framework files
import { HttpService, LocalStorageService } from 'ellaisys-lib';
import { BaseService } from '../../base.service';

//Application files
import { ILookup } from '../../../interfaces/common/lookup.interface';


@Injectable({
  providedIn: 'root'
})
export class LookupService extends BaseService {


  /**
   * Default constructor
   */
  constructor(
    private _httpService: HttpService,
    private _localStorageService: LocalStorageService,
  ) { super(); }


  /**
   * Get List of Lookup Data
   */
  public getAll(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._httpService.get('lookup')
        .then((response: any) => {
          let data: ILookup[] = response.data;

          //Store the data into the local storage
          this._localStorageService.setItem('_LOCAL_STORAGE_LOOKUP_DATA', data);

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Get Lookup by Hash Identifier
   */
  public show(key: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._httpService.get('lookup/'+key)
        .then((response: any) => {
          let data: ILookup = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Update Lookup Data by Key Identifier
   */
  public update(key: string, data: ILookup): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._httpService.put('lookup/'+key, data)
        .then((response: any) => {
          observer.next(response);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends

} //Class ends
