import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

//Framework files
import { HttpService } from 'common-lib';

//Services
import { BaseService } from '../base.service';
import { IContact } from '../../interfaces/contact/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactCommunicationService extends BaseService {

    //Default Constructor
    constructor(
        private _httpService: HttpService,
    ) { super(); }


    /**
     * Get information for the existing Contact
     */
    public get(): Observable<any> {
        return new Observable((observer: Observer<any>) => {
            this._httpService.get('contact').subscribe({ 
                next: (response: any) => {
                    if (response.status=='success') {
                        let data: IContact = response.data;
                        observer.next(data);                    
                    } else {
                        observer.error(response);
                    } //End if
                }, 
                error: (error: any) => { observer.error(error); }, 
                complete: () => { observer.complete(); }
            });
        });
    } //Function ends

} //Class ends