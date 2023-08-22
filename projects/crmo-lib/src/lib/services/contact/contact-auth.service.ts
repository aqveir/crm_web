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

  //Default Constructor
  constructor(
    private _httpService: HttpService,
    private _localStorageService: LocalStorageService,
    private _sessionStorageService: SessionStorageService
  ) { super(); }


  /**
   * Contact Authentication/Sign In
   * 
   * Authenticate the contact using the backend service.
   * @param _data RequestContactLogin
   */
  public login(_data: IRequestContactLogin): Observable<any> {
    //Set HTTP Params
    let params = new HttpParams()
      .set('username', _data.username)
      .set('password', _data.password)
      .set('phone_idd', _data.phone_idd)
      .set('device_id', _data.device_id);

    return Observable.create((observer: Observer<any>) => {
      this._httpService.post('contact/login', params, false, null, ContentType.ENCODED_FORM_DATA)
        .then((response: any) => {
          let claim: IResponseContactLogin = response.data;

          //Store the claim into the session storage
          this._sessionStorageService.setItem('_SESSION_CONTACT_AUTH_CLAIM_KEY', claim);

          //Store the credentials into local storage
          if (_data.remember_me) {
            this._localStorageService.setItem('_LOCAL_STORAGE_CONTACT_AUTH_CREDENTIALS', _data);
          } //End if

          observer.next(claim);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Contact Logout/Sign Out
   * 
   * Logout the contact using the backend service.
   * @param _data ContactLogin
   */
  public logout(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._httpService.put('contact/logout', null)
        .then((response: any) => {

          //Store the claim into the session storage
          if (this._sessionStorageService.hasItem('_SESSION_CONTACT_AUTH_CLAIM_KEY')) {
            this._sessionStorageService.removeItem('_SESSION_CONTACT_AUTH_CLAIM_KEY');
          } //End if          

          observer.next(response);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends



  /**
   * Validate the contact inputs
   * 
   * Validate/check the contact inputs and confirm if that exists
   * @param _data RequestContactValidate
   */
  public validate(_data: IRequestContactValidate): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._httpService.get('contact/exists')
        .then((response: any) => {
          let data: IResponseContactValidate = response.data;
          observer.next(data);
        })
        .catch((error: IResponseError) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Contact Registration
   * 
   * Register the contact using the backend service.
   * @param _data ContactLogin
   */
  public register(_data: IRequestContactRegister): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._httpService.post('contact/register', _data)
        .then((response: any) => {
          observer.next(response);
        })
        .catch((error: IResponseError) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Forgot Password for the Contact
   * 
   * Send the reset link to the contact
   * @param _data RequestContactForgotPassword
   */
  public forgotpassword(_data: IRequestContactForgotPassword): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._httpService.post('contact/forgot', _data)
        .then((response: any) => {
          observer.next(response);
        })
        .catch((error: IResponseError) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends


  /**
   * Change Password for the Contact
   * 
   * Allow the contact to chaneg the password.
   * @param _data RequestContactChangePassword
   */
  public changepassword(_data: IRequestContactChangePassword): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._httpService.post('contact/changepass', _data)
        .then((response: any) => {
          observer.next(response);
        })
        .catch((error: any) =>  { observer.error(error); })
        .finally();
    });
  } //Function ends

} //Class ends
