import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'ellaisys-lib';

@Injectable()
export class BaseService {

  /**
   * @var _httpService
   */
  //public httpService: HttpService;


  constructor() { }


  // /**
  //  * Get List of Service Request
  //  */
  // public getAll(_payload: any=null, _params: Object=null): Observable<any> {
  //   return new Observable((observer: Observer<any>) => {
  //     this.httpService.post('servicerequest/fetch', _payload, false, _params)
  //       .then((response: any) => {
  //         let data: any = response.data;

  //         observer.next(data);
  //       })
  //       .catch((error: any) =>  { observer.error(error); })
  //       .finally()
  //   });
  // } //Function ends


  /**
   * Set Default Params for Fetching Pagination Data
   * 
   * @param _params
   */
  protected setDefaultParamsForPagination(_params: Object=null): Object {
    let objReturnValue: Object;

    try {
      //Create params, if missing
      if (_params==null) { 
        _params = {
          'page': 1,
          'size': 10
        }; 
      } else { 

        //Set page number to fetch data
        if (!this.hasProperty(_params, 'page')) {
          _params['page'] = 1;
        } //End if

        //Set page size to fetch data
        if (!(this.hasProperty(_params, 'size'))) {
          _params['size'] = 10;
        } //End if        
      } //End if

      //Set Object
      objReturnValue=_params;
    } catch (error) {
      throw error;
    } //try-catch ends

    return objReturnValue;
  } //Function ends


  /**
   * Check if the property exists in an object
   * 
   * @param _object 
   * @param _property 
   */
  protected hasProperty(_object: Object, _property: string): boolean {
    return Object.prototype.hasOwnProperty.call(_object, _property);
  } //Function ends
  
} //Class ends
