import { Component, OnDestroy, OnInit } from '@angular/core';

//Library Module
import { TranslateService } from 'common-lib';
import { ApplicationParams } from 'crm-lib';


//Application configurations
import { environment } from '@env-backend/environment';
import { Globals, ILanguage } from './app.global';
import defaultLanguage from "./../assets/i18n/en.json";


@Component({
  selector: 'crm-backend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  /**
   * Delaration of public variables
   */
  public title: string = 'crm-backend';

  //Notification options
  public optionsNotification: any;


  /**
   * Delaration of private variables
   */  
  private hwdTimeInternalId: any;

  
  /**
   * Default constructor
   */
  constructor (
    private _globals: Globals,
    private _translateService: TranslateService
  ) {
    //Set the notification option
    this.optionsNotification = Globals.NotificationDefaultOptions;

    //Process language setup
    this.fnProcessLanguageTranslations();
  } //Function ends


  /**
   * Lifecycle Hook's
   */
  ngOnInit(): void {
    this.hwdTimeInternalId = setInterval(() => {
      this.fnGetUserStatus(); 
    }, environment.application.timer.application_interval);
  } //Function ends
  ngOnDestroy(): void {
    //Kill Timer
    clearInterval(this.hwdTimeInternalId);
  } //Function ends
  
  /**
   * Process the language translations and default
   * language setup.
   */
  private fnProcessLanguageTranslations(): void {
    let paramsApp: ApplicationParams|null = this._globals.getAppParams();
    let DEFAULT_LANGUAGE: string = (paramsApp)?(paramsApp.lang?paramsApp.lang:(Globals._LANGUAGE_ENV_DEFAULT)):(Globals._LANGUAGE_ENV_DEFAULT);

    //Load languages
    let activeLanguages: ILanguage[] = this._globals.getActiveLanguages();
    let arrLangCodes: any = activeLanguages.map((x: any) => {return x.code});
    this._translateService.addLangs(arrLangCodes);

    this._translateService.setTranslation(DEFAULT_LANGUAGE, defaultLanguage);

    //This language will be used as a fallback when a 
    //translation isn't found in the current language
    this._translateService.setDefaultLang(DEFAULT_LANGUAGE);

    //The lang to use, if the lang isn't available, 
    //it will use the current loader to get them
    this._translateService.use(DEFAULT_LANGUAGE);    
  } //Function ends


  /**
   * Get the User Status
   */
  private fnGetUserStatus(): void {
    if (this._globals.getClaim()) {
      this._globals.getUserStatus(true);
    } //End if
  } //Functtion ends

} //Class ends
