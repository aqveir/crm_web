import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

//Framework files
import { ContentType, HttpService } from 'common-lib';

//Services
import { BaseService } from '../base.service';
import { IContact, IContactMinimal, IContactRequest } from '../../interfaces/contact/contact.interface';


@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseService {


  /**
   * Default constructor
   */
  constructor(
    private _httpService: HttpService,
  ) { super(); }


  /**
   * Get All Contacts
   * 
   * @param _payload Object
   * @param _params Object
   * 
   * @returns Observable<any>
   * 
   */
  public getAll(_payload: any=null, _params: Object|null=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('contact/fetch', _payload, false, _params).subscribe({ 
        next: (response: any) => {
          let data: IContactMinimal[] = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Get existing Contact information by Identifier
   * 
   * @param hash string
   * @param _params Object
   * 
   * @returns Observable<any>
   * 
   */
  public show(hash: string, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('contact/' + hash, false, _params).subscribe({ 
        next: (response: any) => {
          let data: IContact = response.data;
          observer.next(data); 
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Create Contact
   * 
   * @param data IContactRequest
   * @param _params Object
   * 
   * @returns Observable<any>
   * 
   */
  public create(data: IContactRequest, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('contact', data, false, _params, ContentType.NOTHING).subscribe({ 
        next: (response: any) => {
          let data: IContact = response.data;
          observer.next(data); 
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Update existing Contact Information
   * 
   * @param hash string
   * @param data IContactRequest
   * @param _params Object
   * 
   * @returns Observable<any>
   * 
   */
  public update(hash: string, data: IContactRequest, _params: Object|null=null): Observable<any> {

    // Add PUT method into the params, incase the param is missing
    if (_params == null) {
      _params = {};
    } //End if
    _params = Object.assign(_params, { '_method': 'PUT' });

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('contact/' + hash, data, false, _params, ContentType.NOTHING).subscribe({ 
        next: (response: any) => {
          let data: IContact = response.data;
          observer.next(data); 
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Delete/Deactivate existing Contact Information
   * 
   * @param hash string
   * @param data IContact
   * 
   * @returns Observable<any>
   * 
   */
  public delete(hash: string,  _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.delete('contact/' + hash, _params).subscribe({ 
        next: (response: any) => {
          let data: IContact = response.data;
          observer.next(data); 
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Upload Contacts Information
   * 
   * @param data IContact
   * @param _params Object
   * 
   * @returns Observable<any>
   * 
   */
  public upload(data: IContact, _params: Object|null=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('contact/upload', data, false, _params, ContentType.NOTHING).subscribe({ 
        next: (response: any) => {
          let data: IContact = response.data;
          observer.next(data); 
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends

} //Class ends