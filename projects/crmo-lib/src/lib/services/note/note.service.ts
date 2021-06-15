import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'ellaisys-lib';
import { BaseService } from '../base.service';

// Interfaces
import { IResponseError } from '../../interfaces/common/response.interface';
import { INote } from '../../interfaces/note/note.interface';


@Injectable({
  providedIn: 'root'
})
export class NoteService extends BaseService {

  //Default Constructor
  constructor(
    private _httpService: HttpService
  ) { super(); }


  /**
   * Get Notes
   */
  public getAll(_payload: any=null, _params: Object=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('note', _payload, false, _params)
        .then((response: any) => {
          let data: INote[] = response.data;
          observer.next(data); 
        })                          
        .catch((error: any) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Create Note
   */
  public create(data: INote): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('note', data)
        .then((response: any) => {
          let data: INote = response.data;

          //Set observer state
          observer.next(data);
        })
        .catch((error: IResponseError) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Update Note
   */
  public update(id: number, data: INote): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('note/' + id.toString, data)
        .then((response: any) => {
          let data: INote = response.data;

          //Set observer state
          observer.next(data);
        })
        .catch((error: IResponseError) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Delete Note
   */
  public delete(id: number): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.delete('note/' + id.toString)
        .then((response: any) => {
          let data: INote = response.data;

          //Set observer state
          observer.next(data);
        })
        .catch((error: IResponseError) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends

} //Class ends
