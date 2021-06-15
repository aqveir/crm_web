import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

//Framework files
import { ContentType, HttpService } from 'ellaisys-lib';

//Services
import { BaseService } from '../base.service';
import { IContact, IContactMinimal, IContactRequest } from '../../interfaces/contact/contact.interface';


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
          let data: IContactMinimal[] = response.data;
          observer.next(data); 
        })                          
        .catch((error: any) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Get existing Contact information by Identifier
   * 
   * @param hash string
   * @param _params Object
   * 
   */
  public show(hash: string, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
        this._httpService.get('contact/' + hash, _params)
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
   * @param data IContactRequest
   * @param _params Object
   * 
   */
  public create(data: IContactRequest, _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
        this._httpService.post('contact', data, false, _params, ContentType.NOTHING)
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
   * @param hash string
   * @param data IContactRequest
   * @param _params Object
   * 
   */
  public update(hash: string, data: IContactRequest, _params: Object=null): Observable<any> {

    // Add PUT method into the params, incase the param is missing
    if (_params == null) {
      _params = {};
    } //End if
    _params['_method'] = 'PUT';

    return new Observable((observer: Observer<any>) => {
        this._httpService.post('contact/' + hash, data, false, _params, ContentType.NOTHING)
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
   * @param hash string
   * @param data IContact
   */
  public delete(hash: string,  _params: Object=null): Observable<any> {
    return new Observable((observer: Observer<any>) => {
        this._httpService.delete('contact/' + hash, _params)
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