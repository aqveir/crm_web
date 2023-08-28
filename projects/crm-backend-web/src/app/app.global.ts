import { Injectable } from "@angular/core";

//Propritery Library
import { IResponseUserLogin, IPrivilege, IUserStatusResponse, ILookupValue,
    ApplicationParams, LookupService, ILookup,  UserStatusService, IRole, IUserMinimal, UserService, RoleService, CountryService, ICountry } from 'crm-lib';
import { LocalStorageService, SessionStorageService, TranslateService, NotificationService } from 'common-lib';

//Project References
import { environment } from '@env-backend/environment';

//Language Interface
export interface IPasswordPolicy {
    MIN_LENGTH: number;
    MAX_LENGTH: number;
    REGEX_PATTERN: RegExp;
    RULES: any;
} //Interface ends

//Language Interface
export interface ILanguage {
    name: string;
    code: string;
    flag: string;
    is_active?: boolean;
} //Interface ends

//Setting Information Model
export class SettingInfo {
    oHash: string|null|undefined=null;
    uHash: string|null|undefined=null;

    selected_oHash: string|null|undefined=null;
} //Class ends

@Injectable()
export class Globals {
    public static readonly _LANGUAGE_ENV_DEFAULT: string = environment.application.language.default_selection;

    public static readonly _LIST_PAGE_DEFAULT_FROM_POSITION: number = 1;
    public static readonly _LIST_PAGE_DEFAULT_RECORDS_DISPLAYED: number = 15;

    //Storage-Session keys
    public static readonly _STORAGE_AUTH_CLAIM_KEY: string=environment.storage_config.storage_keys.auth_claim_key;
    public static readonly _SESSION_APP_PARAMS_KEY: string='_APP_PARAMS_KEY';
    public static readonly _SESSION_SETTING_INFO_KEY: string='_SETTING_INFO_KEY';
    public static readonly _SESSION_ORG_ROLES: string='_SESSION_ORG_ROLES_KEY';
    public static readonly _SESSION_ORG_PRIVILEGES: string='_SESSION_ORG_PRIVILEGES_KEY';
    public static readonly _SESSION_ORG_USERS: string='_SESSION_ORG_USERS_KEY';
    public static readonly _STORAGE_LOOKUP_KEY: string='_LOCAL_STORAGE_LOOKUP_DATA';
    public static readonly _STORAGE_COUNTRIES: string='_LOCAL_STORAGE_COUNTRIES';

    //Event Broker constants
    public static readonly EVENT_SHOW_SUBMENU: string = "show-submenu";

    //Date Format
    public static readonly _DATE_FORMAT_SERVER: string='DD-MM-YYYY HH:mm:ss';
    public static readonly _TIME_FORMAT_SERVER: string='HH:mm:ss';
    public static readonly _DATE_FORMAT_WEB_DISPLAY: string='dd-MM-yyyy';

    //Application constants
    public static readonly _SCROLL_RELOAD_FACTOR: number = 0.9;
    public static readonly _PASSWORD_POLICY: IPasswordPolicy = {
        MIN_LENGTH: 8,
        MAX_LENGTH: 99,
        REGEX_PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&\/,><\’:;|_~`])\S{8,99}$/,
        RULES: {
            LOWERCASE: {
                "id": "lowercase",
                "label": "a-z",
                "library": "abcdefghijklmnopqrstuvwxyz",
                "checked": true
            }, 
            UPPERCASE: {
                "id": "uppercase",
                "label": "A-Z",
                "library": "ABCDEFGHIJKLMNOPWRSTUVWXYZ",
                "checked": true
            }, 
            NUMBERS: {
                "id": "numbers",
                "label": "0-9",
                "library": "0123456789",
                "checked": true
            }, 
            SYMBOLS: {
                "id": "symbols",
                "label": "!-?",
                "library": "+-^$*[]{}()?!@#%&><:|_~",
                "checked": true
            }
        }
    };
    public static readonly _LANGUAGES: any[] = [
        {key:'id', display_value:'Bahasa Indonesia - Indonesian'},
        {key:'msa', display_value:'Bahasa Melayu - Malay'},
        {key:'ca', display_value:'Català - Catalan'},
        {key:'cs', display_value:'Čeština - Czech'},
        {key:'da', display_value:'Dansk - Danish'},
        {key:'de', display_value:'Deutsch - German'},
        {key:'en', display_value:'English US (Default)'},
        {key:'en-gb', display_value:'English UK - British English'},
        {key:'es', display_value:'Español - Spanish'},
        {key:'eu', display_value:'Euskara - Basque (beta)'},
        {key:'fil', display_value:'Filipino'},
        {key:'fr', display_value:'Français - French'},
        {key:'ga', display_value:'Gaeilge - Irish (beta)'},
        {key:'gl', display_value:'Galego - Galician (beta)'},
        {key:'hr', display_value:'Hrvatski - Croatian'},
        {key:'it', display_value:'Italiano - Italian'},
        {key:'hu', display_value:'Magyar - Hungarian'},
        {key:'nl', display_value:'Nederlands - Dutch'},
        {key:'no', display_value:'Norsk - Norwegian'},
        {key:'pl', display_value:'Polski - Polish'},
        {key:'pt', display_value:'Português - Portuguese'},
        {key:'ro', display_value:'Română - Romanian'},
        {key:'sk', display_value:'Slovenčina - Slovak'},
        {key:'fi', display_value:'Suomi - Finnish'},
        {key:'sv', display_value:'Svenska - Swedish'},
        {key:'vi', display_value:'Tiếng Việt - Vietnamese'},
        {key:'tr', display_value:'Türkçe - Turkish'},
        {key:'el', display_value:'Ελληνικά - Greek'},
        {key:'bg', display_value:'Български език - Bulgarian'},
        {key:'ru', display_value:'Русский - Russian'},
        {key:'sr', display_value:'Српски - Serbian'},
        {key:'uk', display_value:'Українська мова - Ukrainian'},
        {key:'he', display_value:'עִבְרִית - Hebrew'},
        {key:'ur', display_value:'اردو - Urdu (beta)'},
        {key:'ar', display_value:'العربية - Arabic'},
        {key:'fa', display_value:'فارسی - Persian'},
        {key:'mr', display_value:'मराठी - Marathi'},
        {key:'hi', display_value:'हिन्दी - Hindi'},
        {key:'bn', display_value:'বাংলা - Bangla'},
        {key:'gu', display_value:'ગુજરાતી - Gujarati'},
        {key:'ta', display_value:'தமிழ் - Tamil'},
        {key:'kn', display_value:'ಕನ್ನಡ - Kannada'},
        {key:'th', display_value:'ภาษาไทย - Thai'},
        {key:'ko', display_value:'한국어 - Korean'},
        {key:'ja', display_value:'日本語 - Japanese'},
        {key:'zh-cn', display_value:'简体中文 - Simplified Chinese'},
        {key:'zh-tw', display_value:'繁體中文 - Traditional Chinese'},
    ];

    //RegEx Patterns
    public static readonly _REGEX_PATTERN_UEL: RegExp=/^(http[s]?:\/\/){0,1}(www.){0,1}[a-zA-Z0-9.-]+.[a-zA-Z]{2,5}[.]{0,1}/;

    //Notification Options
    public static readonly NotificationDefaultOptions: any = {
        position: ["top", "right"],
        timeOut: 3500,
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
    public claimUser: IResponseUserLogin|null = null;
    public params: ApplicationParams|null = null;
    public objUserStatus: IUserStatusResponse|null = null;


    /**
     * Declaration of private variables
     */
    private boolDataLoaded: boolean = false;
    private lookup: ILookup[]|null = null;
    private objSettingInfo: SettingInfo|null  = null;
    private listPrivileges: IPrivilege[]|null = null;
    private listRoles: IRole[]|null  = null;
    private listUsers: IUserMinimal[]|null  = null;
    private listCountry: ICountry[]|null  = null;

    //Default Constructor
    constructor(
        private _localStorageService: LocalStorageService,
        private _sessionStorageService: SessionStorageService,
        private _translateService: TranslateService,
        private _notificationService: NotificationService,

        private _lookupService: LookupService,
        private _countryService: CountryService,
        private _roleService: RoleService,
        private _userService: UserService,
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
            let appParams: ApplicationParams|null = this.getAppParams();
            if (appParams == null) {
                console.log('Application params not found');
                return null;
            } //End if
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
    public getClaim(): IResponseUserLogin|null {
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
    public getAppParams(): ApplicationParams|null {
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
    public getStoreData(): IResponseUserLogin|null {
        if(this.claimUser == null) {
            let strJsonData = this._sessionStorageService.getItem(Globals._STORAGE_AUTH_CLAIM_KEY);
            this.claimUser = strJsonData;
        } //End if
        return this.claimUser;
    } //Function ends
    public setStoreData(_claim: IResponseUserLogin): void {
        this.claimUser = _claim;
    } //Function ends

    //Show notification
    public showSuccess(message: string, boolTranslate: boolean=false): void {
        message = (boolTranslate)?this._translateService.instant(message):message;

        this._notificationService.success(
            this._translateService.instant('NOTIFICATION.COMMON.SUCCESS_TITLE'), 
            message, 
            Globals.NotificationDefaultOptions
        );
    } //Function ends
    public showError(message: string, boolTranslate: boolean=false): void {
        message = (boolTranslate)?this._translateService.instant(message):message;

        this._notificationService.error(
            this._translateService.instant('NOTIFICATION.COMMON.ERROR_TITLE'), 
            message, 
            Globals.NotificationDefaultOptions
        );
    } //Function ends


    /**
     * Getter and Setters for LookUp
     */
    public getLookup(): ILookup[]|null {
        if (this.lookup == null) {
            var strJsonData = this._localStorageService.getItem(Globals._STORAGE_LOOKUP_KEY);
            this.lookup = strJsonData;
        } //End if
        return this.lookup;
    } //Function ends
    public getLookupByKey(_key: string): ILookup|null|undefined {
        if (this.lookup == null) {
            this.getLookup();
        } //End if

        return this.lookup?.find((x: ILookup) => { return x.key == _key; });
    } //Function ends
    public getLookupByKeyValue(_key: string, _valueKey: string): number {
        let lookup = this.getLookupByKey(_key);

        //validate for the null and undefined values
        if (lookup != null && lookup !== undefined && lookup.values != null && lookup.values !== undefined) {
            let lookupValue = (lookup.values).find((x: ILookupValue) => { return x.key == _valueKey; });
            if (lookupValue != null && lookupValue !== undefined) {
                return lookupValue.id;
            } else {
                return 0;
            } //End if
        } //End if
        return 0;
    } //Function ends
    public setLookUp(_lookup: ILookup[]) {
        this.lookup = _lookup;
    } //Function ends


    /**
     * Getter and Setters for User Status
     */
    public getUserStatus(_boolIsForcedUpdate: boolean=false): IUserStatusResponse|null {
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
    public getSettingInfo(): SettingInfo|null {
        if(this.objSettingInfo == null) {
            let strJsonData = this._sessionStorageService.getItem(Globals._SESSION_SETTING_INFO_KEY);
            this.objSettingInfo = (strJsonData)?strJsonData:(new SettingInfo());
        } //End if
        return this.objSettingInfo;
    } //Function ends
    public setSettingInfo(_settingInfo: SettingInfo): void {
        this._sessionStorageService.setItem(Globals._SESSION_SETTING_INFO_KEY, _settingInfo);
        this.objSettingInfo = _settingInfo;
    } //Function ends
    public updateSettingInfo(_settingKey: string, _settingValue: any): void {
        let objSettingInfo = this.getSettingInfo();
        //check if the key exists
        if (objSettingInfo !=null && objSettingInfo.hasOwnProperty(_settingKey)) {
            //objSettingInfo[_settingKey] = _settingValue;
            this.setSettingInfo(objSettingInfo);            
        } //End if
    } //Function ends


    /**
     * Getter and Setters for Meta Data - Country List
     */
    public getCountries(): ICountry[]|null {
        if(this.listCountry == null) {
            let strJsonData = this._localStorageService.getItem(Globals._STORAGE_COUNTRIES);
            this.listCountry = strJsonData;
        } //End if
        return this.listCountry;
    } //Function ends
    public setCountries(_listCountry: ICountry[]): void {
        this._localStorageService.setItem(Globals._STORAGE_COUNTRIES, _listCountry);
        this.listCountry = _listCountry;
    } //Function ends


    /**
     * Getter and Setters for Organization Roles
     */
    public getOrgRoles(): IRole[]|null {
        if(this.listRoles == null) {
            let strJsonData = this._sessionStorageService.getItem(Globals._SESSION_ORG_ROLES);
            this.listRoles = strJsonData;
        } //End if
        return this.listRoles;
    } //Function ends
    public setOrgRoles(_listRoles: IRole[]): void {
        this._sessionStorageService.setItem(Globals._SESSION_ORG_ROLES, _listRoles);
        this.listRoles = _listRoles;
    } //Function ends


    /**
     * Getter and Setters for Organization Users
     */
    public getOrgUsers(activeOnly: boolean=false): IUserMinimal[]|null|undefined {
        if(this.listUsers == null) {
            let strJsonData = this._sessionStorageService.getItem(Globals._SESSION_ORG_USERS);
            this.listUsers = strJsonData;
        } //End if

        if (activeOnly) {
            return this.listUsers?.filter((x) => { return x.is_active == true; });
        } else {
            return this.listUsers;
        } //End if 
    } //Function ends
    public setOrgUsers(_listUsers: IUserMinimal[]): void {
        this._sessionStorageService.setItem(Globals._SESSION_ORG_USERS, _listUsers);
        this.listUsers = _listUsers;
    } //Function ends


    /**
     * Getter and Setters for Application Privileges
     */
    public getOrgPrivileges(): IPrivilege[]|null {
        if(this.listPrivileges == null) {
            let strJsonData = this._sessionStorageService.getItem(Globals._SESSION_ORG_PRIVILEGES);
            this.listPrivileges = strJsonData;
        } //End if
        return this.listPrivileges;
    } //Function ends
    public setOrgPrivileges(_listPrivileges: IPrivilege[]): void {
        this._sessionStorageService.setItem(Globals._SESSION_ORG_PRIVILEGES, _listPrivileges);
        this.listPrivileges = _listPrivileges;
    } //Function ends


    public fnCheckUserPrivilege(privilegeKey: string): boolean {
        let objReturnValue: boolean = false;
        try {
            let boolSuccessCheck: boolean = true;
            let claim: IResponseUserLogin|null = this.getClaim();
            let privilegeList: IPrivilege[]|undefined = claim?.privileges;

            //Check for the 'not' OR '!' sign
            let signIndex: number = privilegeKey.search('!');
            if (signIndex==0) {
                boolSuccessCheck = false;
                privilegeKey = privilegeKey.substring(1, privilegeKey.length);
            } //End if

            let objPrivilege: IPrivilege|undefined = privilegeList?.find((x) => {return (x.key == privilegeKey)?x:null;})
            
            objReturnValue = (objPrivilege && (objPrivilege !== undefined) && boolSuccessCheck)?true:false;
        } catch(error) {
            //Do nothing
        } //Try-catch ends
        return objReturnValue;
    } //Function ends
    

    /**
     * Load values from backend service, this is called
     * at the application load.
     */
    public fnLoadApplicationData(): void {
        if (!this.boolDataLoaded) {

            //Create Setting Model
            let objSettingInfo: SettingInfo|null = this.getSettingInfo();
            if (objSettingInfo != null) {
                objSettingInfo.oHash = this.getClaim()?.organization?.hash;
                objSettingInfo.uHash = this.getClaim()?.hash;
                objSettingInfo.selected_oHash = objSettingInfo.oHash;
                this.setSettingInfo(objSettingInfo);
            } //End if

            //Load lookup data
            this.fnLoadLookupnData();

            //Load Organization Users data
            this.fnLoadOrgUsers();

            //Load Organization Roles data
            this.fnLoadOrgRoles();

            //Load Countries Data
            this.fnLoadCountriesData();

            /**
             * 
             * TODO: Add more method here that needs to be called on user login.
             * 
             */

            //Set the data uploaded status to true
            this.boolDataLoaded=true;            
        } //End if
    } //Function ends


    /**
     * Load Lookup Data from Backend Service
     */
    private fnLoadLookupnData(): void {
        try {
            this._lookupService.getAll().subscribe({ 
                next: (data: ILookup[]) => {
                    this.setLookUp(data);
                }, 
                error: (error) => { console.log(error); }, 
                complete: () => {} 
            });
        } catch(error) {
            console.log(error);
        } //Try-catch ends
    } //Function ends


    /**
     * Load Organization Users Data from Backend Service
     */
    private fnLoadOrgUsers(): void {
        try {
            this._userService.getAll().subscribe({ 
                next: (data: IUserMinimal[]) => {
                    this.setOrgUsers(data);
                }, 
                error: (error) => { console.log(error); }, 
                complete: () => {} 
            });
        } catch(error) {
            console.log(error);
        } //Try-catch ends
    } //Function ends


    /**
     * Load Organization Roles Data from Backend Service
     */
    private fnLoadOrgRoles(): void {
        try {
            this._roleService.getAll()
                .subscribe((data: IRole[]) => {
                    this.setOrgRoles(data);
                },
                (error) => { console.log(error); });
        } catch(error) {
            console.log(error);
        } //Try-catch ends
    } //Function ends


    /**
     * Load Countries Data (Meta Data) from Backend Service
     */
    private fnLoadCountriesData(): void {
        try {
            this._countryService.get()
                .subscribe((data: ICountry[]) => {
                    this.setCountries(data);
                },
                (error) => { console.log(error); });
        } catch(error) {
            console.log(error);
        } //Try-catch ends
    } //Function ends

} //Class ends
