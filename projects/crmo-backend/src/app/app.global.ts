import { Injectable } from "@angular/core";

//Propritery Library
// import { ResponseCustomerLogin, ApplicationParams } from 'omni-lib';
import { LocalStorageService, SessionStorageService, TranslateService, NotificationService } from 'ellaisys-lib';

//Project References
import { environment } from '@env-backend/environment';

//Language Interface
export interface ILanguage {
    name: string;
    code: string;
    flag: string;
    is_active?: boolean;
} //Interface ends

@Injectable()
export class Globals {
    public static readonly _LANGUAGE_ENV_DEFAULT: string = environment.application.language.default_selection;

    //Storage-Session keys
    public static readonly _STORAGE_AUTH_CLAIM_KEY: string=environment.storage_config.storage_keys.auth_claim_key;
    public static readonly _SESSION_APP_PARAMS_KEY: string='_APP_PARAMS_KEY';

    //Date Format
    public static readonly _DATE_FORMAT_SERVER: string='DD-MM-YYYY HH:mm:ss';
    public static readonly _TIME_FORMAT_SERVER: string='HH:mm:ss';
    public static readonly _DATE_FORMAT_WEB_DISPLAY: string='dd-MM-yyyy';

    //Notification Options
    public static readonly NotificationDefaultOptions: any = {
        position: ["bottom", "right"],
        timeOut: 1500,
        lastOnBottom: true,
        showProgressBar: false,
        pauseOnHover: true,
        clickToClose: true,
    };


    //Breadcrumb Data
    public static readonly _BREADCRUMBS: any = {
        'user-login': [
            { key:'breadcrumb_user_login', url:'/user/login', value:'Login' }
        ],
        'user-my-cart': [
            { key:'breadcrumb_user_my_cart', url:'/user/my-cart', value:'Shopping Cart' }
        ],
        'catalogue-category': [
            { key:'breadcrumb_catalogue-category', url:'/product/category', value:'Category' }
        ]
    };


    //Application Constants
    public static readonly APPLICATION_CONSTANT: any = {
        LANGUAGES: environment.application.language.options,
    };


    /**
     * Delaration of variables
     */
//     public claimCustomer: ResponseCustomerLogin | null;
//     public params: ApplicationParams | null;

    //Default Constructor
    constructor(
        private _localStorageService: LocalStorageService,
        private _sessionStorageService: SessionStorageService,
        private _translateService: TranslateService,
        private _notificationService: NotificationService
    ) {
    } //Function ends


    /**
     * Getter/Setters and Validators for Application Languages
     */
    public getActiveLanguages(): ILanguage[] {
        let objLanguages: [] = Globals.APPLICATION_CONSTANT.LANGUAGES;
        return objLanguages.filter((language: any) => (language.is_active==true)).sort((a: any, b: any) => { return a.order-b.order });
    } //Function ends
    public setLanguage(_langCode: string, _boolShowNotify: boolean=false): void {
        this._translateService.use(_langCode).subscribe(() => {
            //Set lang params
            //let appParams: ApplicationParams = this.getAppParams();
            //appParams.lang = _langCode;

            //Save lang params
            //this.setAppParams(appParams);

            //Show Notification
            if (_boolShowNotify) {
                this._notificationService.success(
                    this._translateService.instant('NOTIFICATION_COMMON_SUCCESS_TITLE'), 
                    'Language changed', 
                    Globals.NotificationDefaultOptions
                );
            } //End if
        });
    } //Function ends
    public validateLanguage(_langCode: string): boolean {
        let objLanguages: [] = Globals.APPLICATION_CONSTANT.LANGUAGES;
        return objLanguages.filter((language:any) => (language.code==_langCode && language.isActive==true))?true:false;
    } //Function ends

    
//     /**
//      * Getter and Setters for Authentication Claim Token
//      */
//     public getClaim(): ResponseCustomerLogin {
//         if(this.claimCustomer == null) {
//             let strJsonData = this._sessionStorageService.getItem(Globals._STORAGE_AUTH_CLAIM_KEY);
//             this.claimCustomer = strJsonData;
//         } //End if
//         return this.claimCustomer;
//     } //Function ends
//     public setClaim(_claim: ResponseCustomerLogin): void {
//         this.claimCustomer = _claim;
//     } //Function ends


//     /**
//      * Getter and Setters for Application Params
//      */
//     public getAppParams(): ApplicationParams {
//         if(this.params == null) {
//             let strJsonData = this._sessionStorageService.getItem(Globals._SESSION_APP_PARAMS_KEY);
//             this.params = (strJsonData)?strJsonData:(new ApplicationParams());
//         } //End if
//         return this.params;
//     } //Function ends
//     public setAppParams(_params: ApplicationParams): void {
//         this._sessionStorageService.setItem(Globals._SESSION_APP_PARAMS_KEY, _params);
//         this.params = _params;
//     } //Function ends


//     /**
//      * Getter and Setters for Store Layout
//      */
//     public getStoreData(): ResponseCustomerLogin {
//         if(this.claimCustomer == null) {
//             let strJsonData = this._sessionStorageService.getItem(Globals._STORAGE_AUTH_CLAIM_KEY);
//             this.claimCustomer = strJsonData;
//         } //End if
//         return this.claimCustomer;
//     } //Function ends
//     public setStoreData(_claim: ResponseCustomerLogin): void {
//         this.claimCustomer = _claim;
//     } //Function ends

} //Class ends
