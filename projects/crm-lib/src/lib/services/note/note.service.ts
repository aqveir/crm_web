import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'common-lib';
import { BaseService } from '../base.service';

// Interfaces
import { IResponseError } from '../../interfaces/common/response.interface';
import { INote } from '../../interfaces/note/note.interface';


@Injectable({
  providedIn: 'root'
})
export class NoteService extends BaseService {


  /**
   * Default constructor
   */
  constructor(
    private _httpService: HttpService
  ) { super(); }


  /**
   * Get Notes
   */
  public getAll(_payload: any=null, _params: Object|null=null): Observable<any> {
    //Add Pagination params, if missing
    _params = super.setDefaultParamsForPagination(_params);

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('note', _payload, false, _params).subscribe({ 
        next: (response: any) => {
          let data: INote[] = response.data;
          observer.next(data); 
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Create Note
   */
  public create(data: INote): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('note', data).subscribe({ 
        next: (response: any) => {
          let data: INote = response.data;
          observer.next(data); 
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Update Note by Identifier
   * 
   * @param _hash string
   * @param _data INote
   * 
   * @returns Observable<any>
   * 
   */
  public update(_hash: string, _data: INote): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('note/' + _hash, _data).subscribe({ 
        next: (response: any) => {
          let data: INote = response.data;
          observer.next(data); 
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Delete Note by Identifier
   * 
   * @param _hash string
   * 
   * @returns Observable<any>
   * 
   */
  public delete(_hash: string): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.delete('note/'+_hash).subscribe({ 
        next: (response: any) => {
          let data: INote = response.data;
          observer.next(data); 
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends

} //Class ends
