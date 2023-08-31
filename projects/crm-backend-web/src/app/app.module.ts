
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

//import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

//Application Environment
import { environment } from '@env-backend/environment';

//Application Modules
import { 
  NgxCommonLibModule, NotificationModule, ValidatorModule, PipeModule, 
  TranslateModule, TranslateLoader, TranslateHttpLoader, HttpLoaderFactory,
  LoggerModule, LoggerLevel
} from 'common-lib';
import { CrmLibModule } from 'crm-lib';
import { AppRoutingModule } from './app-routing.module';

import { UserModule } from './modules/user/user.module';
import { ConsoleModule } from './modules/console/console.module';

//Application Configurations & Handlers
import { Globals } from './app.global';
import { GlobalErrorHandler } from './handlers/global-error-handler.handler';

//Third Party Application Modules
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

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

export function GetApplicationLocation(_location: Location) {
  return _location;
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,

    //Third Party Referenced Modules
    InlineSVGModule.forRoot(),
    NgSelectModule,
    NgbModule,

    //Common Library
    NgxCommonLibModule.forRoot(
      {'env': environment}, 
      {'win_location': window.location}
    ),
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

    //CRM Library Module
    CrmLibModule,

    //CRM Modules
    UserModule,
    ConsoleModule
  ],
  providers: [
    Globals,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    Location, {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent],
  exports: [
    CommonModule,
    ReactiveFormsModule
  ]
})

export class AppModule { }
