import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Framework files
import { HttpService } from 'ellaisys-lib';
import { BaseService } from '../base.service';

// Interfaces
import { IResponseError } from '../../interfaces/common/response.interface';
import { IDocument, IDocumentRequest } from '../../interfaces/document/document.interface';


@Injectable({
  providedIn: 'root'
})
export class DocumentService extends BaseService {

  //Default Constructor
  constructor(
    private _httpService: HttpService
  ) { super(); }


  /**
   * Download Document
   */
  public download(hash: string): Observable<Blob> {
    return new Observable((observer: Observer<Blob>) => {
      this._httpService.get('document/'+hash, null, false, true)
        .then((response: any) => {
          //Set observer state
          observer.next(response);
        })
        .catch((error: IResponseError) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Update Document
   */
  public update(hash: string, data: IDocumentRequest): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('document/'+hash, data)
        .then((response: any) => {
          let data: IDocument = response.data;

          //Set observer state
          observer.next(data);
        })
        .catch((error: IResponseError) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Delete Document
   */
  public delete(hash: string): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.delete('document/'+hash)
        .then((response: any) => {
          let data: IDocument = response.data;

          //Set observer state
          observer.next(data);
        })
        .catch((error: IResponseError) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends

} //Class ends
