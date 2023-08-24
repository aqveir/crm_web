import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'common-lib';
import { BaseService } from '../base.service';

// Interfaces
import { IResponseError } from '../../interfaces/common/response.interface';
import { IDocument, IDocumentRequest } from '../../interfaces/document/document.interface';


@Injectable({
  providedIn: 'root'
})
export class DocumentService extends BaseService {


  /**
   * Default constructor
   */
  constructor(
    private _httpService: HttpService
  ) { super(); }


  /**
   * Download Document
   * 
   * @param hash string
   * 
   * @returns Observable<Blob>
   * 
   */
  public download(hash: string): Observable<Blob> {
    return new Observable((observer: Observer<Blob>) => {
      this._httpService.get('document/'+hash, false, null, true).subscribe({ 
        next: (response: any) => {
          observer.next(response);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Update Document
   * 
   * @param hash string
   * 
   * @returns Observable<any>
   * 
   */
  public update(hash: string, data: IDocumentRequest): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('document/'+hash, data).subscribe({ 
        next: (response: any) => {
          let data: IDocument = response.data;

          //Set observer state
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Delete Document
   */
  public delete(hash: string): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.delete('document/'+hash).subscribe({ 
        next: (response: any) => {
          let data: IDocument = response.data;

          //Set observer state
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends

} //Class ends
