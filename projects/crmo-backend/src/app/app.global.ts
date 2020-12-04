import { Injectable } from "@angular/core";

//Propritery Library
import { IResponseUserLogin, ApplicationParams, LookupService, ILookup, ILookupValue, UserStatusService, IUserStatusResponse } from 'crmo-lib';
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

//Setting Information Model
export class SettingInfo {
    oHash: string=null;
    uHash: string=null;
} //Class ends

@Injectable()
export class Globals {
    public static readonly _LANGUAGE_ENV_DEFAULT: string = environment.application.language.default_selection;

    //Storage-Session keys
    public static readonly _STORAGE_AUTH_CLAIM_KEY: string=environment.storage_config.storage_keys.auth_claim_key;
    public static readonly _SESSION_APP_PARAMS_KEY: string='_APP_PARAMS_KEY';
    public static readonly _STORAGE_LOOKUP_KEY: string='_LOCAL_STORAGE_LOOKUP_DATA';

    //Date Format
    public static readonly _DATE_FORMAT_SERVER: string='DD-MM-YYYY HH:mm:ss';
    public static readonly _TIME_FORMAT_SERVER: string='HH:mm:ss';
    public static readonly _DATE_FORMAT_WEB_DISPLAY: string='dd-MM-yyyy';

    //RegEx Patterns
    public static readonly _REGEX_PATTERN_UEL: string="/^(http[s]?://){0,1}(www.){0,1}[a-zA-Z0-9.-]+.[a-zA-Z]{2,5}[.]{0,1}/";

    //Notification Options
    public static readonly NotificationDefaultOptions: any = {
        position: ["top", "right"],
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
     * Delaration of public variables
     */
    public claimUser: IResponseUserLogin | null;
    public params: ApplicationParams | null;
    public objUserStatus: IUserStatusResponse = null;


    /**
     * Declaration of private variables
     */
    private boolDataLoaded: boolean = false;
    private lookup: ILookup[] = null;
    private objSettingInfo: SettingInfo = null;


    //Default Constructor
    constructor(
        private _localStorageService: LocalStorageService,
        private _sessionStorageService: SessionStorageService,
        private _translateService: TranslateService,
        private _notificationService: NotificationService,

        private _lookupService: LookupService,
        private _userStatusService: UserStatusService
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
            let appParams: ApplicationParams = this.getAppParams();
            appParams.lang = _langCode;

            //Save lang params
            this.setAppParams(appParams);

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

    
    /**
     * Getter and Setters for Authentication Claim Token
     */
    public getClaim(): IResponseUserLogin {
        if(this.claimUser == null) {
            let strJsonData = this._sessionStorageService.getItem(Globals._STORAGE_AUTH_CLAIM_KEY);
            this.claimUser = strJsonData;
        } //End if
        return this.claimUser;
    } //Function ends
    public setClaim(_claim: IResponseUserLogin): void {
        this._sessionStorageService.setItem(Globals._STORAGE_AUTH_CLAIM_KEY, _claim);
        this.claimUser = _claim;
    } //Function ends


    /**
     * Getter and Setters for Application Params
     */
    public getAppParams(): ApplicationParams {
        if(this.params == null) {
            let strJsonData = this._sessionStorageService.getItem(Globals._SESSION_APP_PARAMS_KEY);
            this.params = (strJsonData)?strJsonData:(new ApplicationParams());
        } //End if
        return this.params;
    } //Function ends
    public setAppParams(_params: ApplicationParams): void {
        this._sessionStorageService.setItem(Globals._SESSION_APP_PARAMS_KEY, _params);
        this.params = _params;
    } //Function ends


    /**
     * Getter and Setters for Store Layout
     */
    public getStoreData(): IResponseUserLogin {
        if(this.claimUser == null) {
            let strJsonData = this._sessionStorageService.getItem(Globals._STORAGE_AUTH_CLAIM_KEY);
            this.claimUser = strJsonData;
        } //End if
        return this.claimUser;
    } //Function ends
    public setStoreData(_claim: IResponseUserLogin): void {
        this.claimUser = _claim;
    } //Function ends


    /**
     * Getter and Setters for LookUp
     */
    public getLookup(): ILookup[] {
        if (this.lookup == null) {
            var strJsonData = this._localStorageService.getItem(Globals._STORAGE_LOOKUP_KEY);
            this.lookup = JSON.parse(strJsonData);
        } //End if
        return this.lookup;
    } //Function ends
    public getLookupByKey(_key: string): ILookup {
        if (this.lookup == null) {
            this.getLookup();
        } //End if

        return this.lookup.find((x: ILookup) => { return x.key == _key; });
    } //Function ends
    public getLookupByKeyValue(_key: string, _valueKey: string): number {
        let lookup = this.getLookupByKey(_key);
        let lookupValue = (lookup.values).find((x: ILookupValue) => { return x.key == _valueKey; });

        return lookupValue.id;
    } //Function ends
    public setLookUp(_lookup: ILookup[]) {
        this.lookup = _lookup;
    } //Function ends



    /**
     * Getter and Setters for User Status
     */
    public getUserStatus(_boolIsForcedUpdate: boolean=false): IUserStatusResponse {
        if (this.objUserStatus==null || _boolIsForcedUpdate) {
            this._userStatusService.get()
                .subscribe((response: IUserStatusResponse) => {
                    this.objUserStatus = response;

                    return this.objUserStatus;
                }, (error) => {
                    throw error;
                });
                
            return null;
        } else {
            return this.objUserStatus;
        } //End if
    } //Function ends
    public setUserStatus(_userStatus: string): void {
        this._userStatusService.set(_userStatus)
            .subscribe((response: any) => {
                this.objUserStatus = response;
            }, (error) => {
                throw error;
            });
    } //Function ends


    /**
     * Getter and Setters for Setting Information
     */
    public getSettingInfo(): SettingInfo {
        if(this.objSettingInfo == null) {
            let objSettingInfo: SettingInfo = new SettingInfo();
            objSettingInfo['oHash'] = this.getAppParams().oHash;

            this.objSettingInfo = objSettingInfo;
        } //End if
        return this.objSettingInfo;
    } //Function ends
    public setSettingInfo(_settingInfo: SettingInfo): void {
        this.objSettingInfo = _settingInfo;
    } //Function ends
    

    /**
     * Load values from backend service, this is called
     * at the application load.
     */
    public fnLoadApplicationData(): void {
        if (!this.boolDataLoaded) {

            //Create Setting Model
            let objSettingInfo: SettingInfo = this.getSettingInfo();
            objSettingInfo['oHash'] = this.getAppParams().oHash;
            objSettingInfo['uHash'] = this.getClaim().hash;
            this.setSettingInfo(objSettingInfo);

            //Load lookup data
            this.fnLoadLookupnData();

            //Set the data uploaded status to true
            this.boolDataLoaded=true;            
        } //End if
    } //Function ends


    /**
     * Load Lookup Data from Backend Service
     */
    private fnLoadLookupnData(): void {
        try {
            this._lookupService.getAll()
                .subscribe((data: ILookup[]) => {
                    this.setLookUp(data);
                },
                (error) => { console.log(error); });
        } catch(error) {
            console.log(error);
        } //Try-catch ends
    } //Function ends

} //Class ends
