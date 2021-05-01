import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

//Framework files
import { HttpService } from 'ellaisys-lib';

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
    public getAll(_viewName?: string, _filter?: string, _page: string='1', _size: string='10', _payload: any=null): Observable<any> {

      //Set HTTP Params
      let params = new HttpParams()
      .set('view', _viewName)
      .set('filter', _filter)
      .set('page', _page)
      .set('size', _size);

      return new Observable((observer: Observer<any>) => {
        this._httpService.post('contact/fetch', _payload, false, params)
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
     */
    public get(cHash: string): Observable<any> {
      return new Observable((observer: Observer<any>) => {
          this._httpService.get('contact/' + cHash)
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
     */
    public create(data: IContact): Observable<any> {
      return new Observable((observer: Observer<any>) => {
          this._httpService.post('contact', data)
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
     */
    public update(cHash: string, data: IContact): Observable<any> {
      return new Observable((observer: Observer<any>) => {
          this._httpService.put('contact/' + cHash, data)
          .then((response: any) => {
            let data: IContact = response.data;
            observer.next(data); 
          })
          .catch((error: any) =>  { observer.error(error); })
          .finally();
      });
    } //Function ends

} //Class ends