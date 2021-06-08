import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

//Framework files
import { ContentType, HttpService } from 'ellaisys-lib';

//Services
import { BaseService } from '../base.service';
import { IContact } from '../../interfaces/contact/contact.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseService {

  //Default Constructor
  constructor(
      private _httpService: HttpService,
  ) { super(); }


  /**
   * Get All Contacts
   */
  public getAll(_payload: any=null, _params: Object=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('contact/fetch', _payload, false, _params)
        .then((response: any) => {
          let data: IContact[] = response.data;
          observer.next(data); 
        })                          
        .catch((error: any) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Get existing Contact information by Identifier
   * 
   * @param cHash string
   * @param _params Object
   * 
   */
  public show(cHash: string, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
        this._httpService.get('contact/' + cHash, _params)
        .then((response: any) => {
          let data: IContact = response.data;
          observer.next(data); 
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Create Contact
   * 
   * @param data IContact
   * @param _params Object
   * 
   */
  public create(data: IContact, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
        this._httpService.post('contact', data, false, _params)
        .then((response: any) => {
          let data: IContact = response.data;
          observer.next(data); 
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Update existing Contact Information
   * 
   * @param cHash string
   * @param data IContact
   * @param _params Object
   * 
   */
  public update(cHash: string, data: IContact, _params: Object=null): Observable<any> {

    // Add PUT method into the params, incase the param is missing
    if (_params == null) {
      _params = {};
    } //End if
    _params['_method'] = 'PUT';

    return new Observable((observer: Observer<any>) => {
        this._httpService.post('contact/' + cHash, data, false, _params, ContentType.NOTHING)
        .then((response: any) => {
          let data: IContact = response.data;
          observer.next(data); 
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Delete/Deactivate existing Contact Information
   * 
   * @param cHash string
   * @param data IContact
   */
  public delete(cHash: string,  _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
        this._httpService.delete('contact/' + cHash, _params)
        .then((response: any) => {
          let data: IContact = response.data;
          observer.next(data); 
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Upload Contacts Information
   * 
   * @param data IContact
   * @param _params Object
   */
  public upload(data: IContact, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
        this._httpService.post('contact/upload', data, false, _params, ContentType.NOTHING)
        .then((response: any) => {
          let data: IContact = response.data;
          observer.next(data); 
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends

} //Class ends