import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'ellaisys-lib';
import { BaseService } from '../base.service';

// Interfaces
import { IPreference, IPreferenceMinimal, IPreferenceRequest } from '../../interfaces/preference/preference.interface';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService extends BaseService {

  /**
   * Default constructor
   */
  constructor(
    private _httpService: HttpService
  ) { super(); }


  /**
   * Get List of Organization Preferences
   */
  public getAll(_params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('preference', _params)
        .then((response: any) => {
          let data: IPreferenceMinimal[] = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Get Organization Preference by Identifier
   */
  public show(id: number, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('preference/'+id.toString())
        .then((response: any) => {
          let data: IPreference = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Create Organization Preference Data
   */
  public create(data: IPreferenceRequest, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('preference', data)
        .then((response: any) => {
          let data: any = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Update Organization Preference Data by Identifier
   */
  public update(id: number, data: IPreferenceRequest, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('preference/'+id.toString(), data)
        .then((response: any) => {
          let data: any = response.data;

          observer.next(data);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends


  /**
   * Delete Organization Preference Data by Identifier
   */
  public delete(id: number, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.delete('preference/'+id.toString())
        .then((response: any) => {
          observer.next(response);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally()
    });
  } //Function ends

} //Class ends
