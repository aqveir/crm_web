import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpParams } from '@angular/common/http';

//Framework files
import { ContentType, HttpService, LocalStorageService, SessionStorageService } from 'common-lib';
import { BaseService } from '../base.service';

//Interfaces
import { IResponseError } from '../../interfaces/common/response.interface';
import { IRequestContactLogin, IResponseContactLogin, IRequestContactValidate, 
        IResponseContactValidate, IRequestContactRegister, IRequestContactForgotPassword, 
        IRequestContactChangePassword } from '../../interfaces/contact/contact-auth.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactAuthService extends BaseService {


  /**
   * Default constructor
   */
  constructor(
    private _httpService: HttpService,
    private _localStorageService: LocalStorageService,
    private _sessionStorageService: SessionStorageService
  ) { super(); }


  /**
   * Contact Authentication/Sign In
   * Authenticate the contact using the backend service.
   * 
   * @param _data RequestContactLogin
   * 
   * @returns Observable<any>
   * 
   */
  public login(_data: IRequestContactLogin): Observable<any> {
    //Set HTTP Params
    let params = new HttpParams()
      .set('username', _data.username)
      .set('password', _data.password)
      .set('phone_idd', _data.phone_idd)
      .set('device_id', _data.device_id);

    return new Observable((observer: Observer<any>) => {
      this._httpService.post('contact/login', params, false, null, ContentType.ENCODED_FORM_DATA).subscribe({ 
        next: (response: any) => {
          let claim: IResponseContactLogin = response.data;

          //Store the claim into the session storage
          this._sessionStorageService.setItem('_SESSION_CONTACT_AUTH_CLAIM_KEY', claim);

          //Store the credentials into local storage
          if (_data.remember_me) {
            this._localStorageService.setItem('_LOCAL_STORAGE_CONTACT_AUTH_CREDENTIALS', _data);
          } //End if

          observer.next(claim);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Contact Logout/Sign Out
   * Logout the contact using the backend service.
   * 
   * @returns Observable<any>
   * 
   */
  public logout(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.put('contact/logout', null).subscribe({ 
        next: (response: any) => {

          //Store the claim into the session storage
          if (this._sessionStorageService.hasItem('_SESSION_CONTACT_AUTH_CLAIM_KEY')) {
            this._sessionStorageService.removeItem('_SESSION_CONTACT_AUTH_CLAIM_KEY');
          } //End if          

          observer.next(response);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends



  /**
   * Validate the contact inputs
   * Validate/check the contact inputs and confirm if that exists
   * 
   * @param _data RequestContactValidate
   * 
   * @returns Observable<any>
   * 
   */
  public validate(_data: IRequestContactValidate): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.get('contact/exists').subscribe({ 
        next: (response: any) => {
          let data: IResponseContactValidate = response.data;
          observer.next(data);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });;
  } //Function ends


  /**
   * Contact Registration
   * 
   * Register the contact using the backend service.
   * 
   * @param _data ContactLogin
   * 
   * @returns Observable<any>
   * 
   */
  public register(_data: IRequestContactRegister): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('contact/register', _data).subscribe({ 
        next: (response: any) => {
          observer.next(response);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Forgot Password for the Contact
   * 
   * Send the reset link to the contact
   * 
   * @param _data RequestContactForgotPassword
   * 
   * @returns Observable<any>
   * 
   */
  public forgotpassword(_data: IRequestContactForgotPassword): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('contact/forgot', _data).subscribe({ 
        next: (response: any) => {
          observer.next(response);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends


  /**
   * Change Password for the Contact
   * 
   * Allow the contact to chaneg the password.
   * @param _data RequestContactChangePassword
   * 
   * @returns Observable<any>
   */
  public changepassword(_data: IRequestContactChangePassword): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this._httpService.post('contact/changepass', _data).subscribe({ 
        next: (response: any) => {
          observer.next(response);
        }, 
        error: (error: any) => { observer.error(error); }, 
        complete: () => { observer.complete(); }
      });
    });
  } //Function ends

} //Class ends
