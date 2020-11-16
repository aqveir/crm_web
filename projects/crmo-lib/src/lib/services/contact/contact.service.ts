import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

//Framework files
import { HttpService } from 'ellaisys-lib';

//Services
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseService {

    //Default Constructor
    constructor(
        private _httpService: HttpService,
    ) { super(); }


    /**
     * Get information for the existing Contact
     */
    public get(): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            this._httpService.get('contact')
            .then((response: any) => {
                if (response.status=='success') {
                    let data: any = response.data;
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