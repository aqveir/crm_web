import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpParams } from '@angular/common/http';

//Framework files
import { HttpService, LocalStorageService, SessionStorageService } from 'ellaisys-lib';

//Interfaces
import { IResponse } from '../../interfaces/common/response.interface';

//Models
import { ResponseContact } from '../../models/contact/contact.model';

//Services
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseService {

    //Default Constructor
    constructor(
        private _httpService: HttpService,
        private _localStorageService: LocalStorageService,
        private _sessionStorageService: SessionStorageService
    ) { super(); }


    /**
     * Get information for the existing Contact
     */
    public get(): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            this._httpService.get('contact')
            .then((response: any) => {
                if (response.status=='success') {
                    let data: ResponseContact = response.data;
                    observer.next(data);                    
                } else {
                    observer.error(response);
                } //End if
            })
            .catch((error: any) =>  { observer.error(error); })
            .finally();
        });
    } //Function ends

} //Class ends