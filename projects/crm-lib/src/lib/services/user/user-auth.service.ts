import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpParams } from '@angular/common/http';

// Framework files
import { ContentType, HttpService, LocalStorageService, SessionStorageService } from 'common-lib';
import { BaseService } from '../base.service';

// Interfaces
import { IResponseError } from '../../interfaces/common/response.interface';
import { IRequestUserForgotPassword, IRequestUserLogin, IRequestUserResetPassword, IResponseUserLogin } from '../../interfaces/user/user-auth.interface';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService extends BaseService {

  
  /**
   * Default constructor
   */
  constructor(
    private _httpService: HttpService,
    private _localStorageService: LocalStorageService,
    private _sessionStorageService: SessionStorageService
  ) { super(); }


  /**
   * Authenticate the user using the backend service.
   * 
   * @param _data IRequestUserLogin
   * 
   * @returns Observable<any>
   * 
   */
  public login(_data: IRequestUserLogin): Observable<any> {
    //Set HTTP Params
    let params = new HttpParams()
      .set('username', _data.username)
      .set('password', _data.password)
      .set('device_id', _data.device_id);

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('user/login', params, false, null, ContentType.ENCODED_FORM_DATA).subscribe({ 
        next: (response: any) => {
          let claim: IResponseUserLogin = response.data;

          //Store the claim into the session storage
          this._sessionStorageService.setItem('_SESSION_USER_AUTH_CLAIM_KEY', claim);

          //Store the credentials into local storage
          if (_data.remember_me) {
            this._localStorageService.setItem('_LOCAL_STORAGE_USER_AUTH_CREDENTIALS', _data);
          } //End if

          observer.next(claim);
        }, 
        error: (error: IResponseError) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * User Logout/Sign Out
   * Logout the user using the backend service.
   * 
   * @returns Observable<any>
   */
  public logout(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('user/logout', null).subscribe({ 
        next: (response: any) => {
          //Store the claim into the session storage
          if (this._sessionStorageService.hasItem('_SESSION_USER_AUTH_CLAIM_KEY')) {
            this._sessionStorageService.removeItem('_SESSION_USER_AUTH_CLAIM_KEY');
          } //End if          

          observer.next(response);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * User Forgot Password
   * 
   * @param _data IRequestUserForgotPassword
   * 
   * @returns Observable<any>
   * 
   */
  public forgot(_data: IRequestUserForgotPassword): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('user/forgot', _data).subscribe({ 
        next: (response: any) => {
          let data: any = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * User Reset Password
   * 
   * @param _data IRequestUserResetPassword
   * 
   * @returns Observable<any>
   * 
   */
  public reset(_data: IRequestUserResetPassword): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('user/reset', _data).subscribe({ 
        next: (response: any) => {
          let data: any = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends

} //Class ends
