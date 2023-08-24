import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

//Framework files
import { HttpService, LocalStorageService } from 'common-lib';
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
   * 
   * @param _params
   * 
   * @returns Observable<any>
   * 
   */
  public getAll(_params: any=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('lookup', _params).subscribe({ 
        next: (response: any) => {
          let data: ILookup[] = response.data;

          //Store the data into the local storage
          this._localStorageService.setItem('_LOCAL_STORAGE_LOOKUP_DATA', data);

          observer.next(data); 
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Get Lookup by Hash Identifier
   * 
   * @param _hash
   * @param _params
   * 
   * @returns Observable<any>
   * 
   */
  public show(key: string, _params: any=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('lookup/'+key).subscribe({ 
        next: (response: any) => {
          let data: ILookup = response.data;

          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Update Lookup Data by Key Identifier
   * 
   * @param key
   * @param data
   * @param _params
   * 
   * @returns Observable<any>
   * 
   */
  public update(key: string, data: ILookup, _params: any=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('lookup/'+key, data).subscribe({ 
        next: (response: any) => {
          let data: ILookup = response.data;

          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends

} //Class ends
