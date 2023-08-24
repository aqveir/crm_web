import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'common-lib';
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
  public getAll(_params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('preference', false, _params).subscribe({ 
        next: (response: any) => {
          let data: IPreferenceMinimal[] = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Get Organization Preference by Identifier
   */
  public show(_id: string, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('preference/'+_id, false, _params).subscribe({ 
        next: (response: any) => {
          let data: IPreference = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Create Organization Preference Data
   */
  public create(_data: IPreferenceRequest, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('preference', _data, false, _params).subscribe({ 
        next: (response: any) => {
          let data: any = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Update Organization Preference Data by Identifier
   */
  public update(_id: string, data: IPreferenceRequest, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('preference/'+_id, data).subscribe({ 
        next: (response: any) => {
          let data: any = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Delete Organization Preference Data by Identifier
   */
  public delete(_id: string, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.delete('preference/'+_id).subscribe({ 
        next: (response: any) => {
          let data: any = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends

} //Class ends
