import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule, ErrorHandler, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

//Application Environment
import { environment } from '@env-backend/environment';

//Application Modules
import { InlineSVGModule } from 'ng-inline-svg';
import { AppRoutingModule } from './app-routing.module';
import { 
  EllaisysLibModule, NotificationModule, ValidatorModule, PipeModule, 
  TranslateModule, TranslateLoader, TranslateHttpLoader, HttpLoaderFactory,
  LoggerModule, LoggerLevel, LoaderService
} from 'ellaisys-lib';
import { CrmoLibModule } from 'crmo-lib';

import { UserModule } from './modules/user/user.module';
import { ConsoleModule } from './modules/console/console.module';

//Application Configurations & Handlers
import { Globals } from './app.global';
import { GlobalErrorHandler } from './handlers/global-error-handler.handler';

//Application Components
import { AppComponent } from './app.component';


/**
 * Translate Module Factory Loader
 * 
 * @param http 
 */
export function HttpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),

    //EllaiSys Library
    EllaisysLibModule.forRoot({
      'env': environment
    }),
    ValidatorModule,
    PipeModule,
    
    //Tranlate Module
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate : false
    }),
    
    //Logger Module
    LoggerModule.forRoot({
      level: LoggerLevel.DEBUG,
      disableConsoleLogging: false,
      serverLogLevel: LoggerLevel.OFF,
      serverLoggingUrl: 'api/logger',
      httpResponseType: 'json',
      enableSourceMaps: false
    }),
    
    //Notification Module
    NotificationModule.forRoot(),

    //CRMO Library Module
    CrmoLibModule,

    //CRMO Modules
    UserModule,
    ConsoleModule
  ],
  providers: [
    Globals,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  /**
   * Default Constructor
   * Create global Service Injector
   * 
   * @param _injector 
   */
  constructor(
    private _injector: Injector
  ) {
    //LoaderService.injector = this._injector;
  }
}
