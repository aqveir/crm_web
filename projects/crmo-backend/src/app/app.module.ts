import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { InlineSVGModule } from 'ng-inline-svg';

import { UserModule } from './modules/user/user.module';
import { ConsoleModule } from './modules/console/console.module';

import { AppComponent } from './app.component';


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

    //CRMO Modules
    UserModule,
    ConsoleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
