import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//Application Module
import { TranslateModule, NotificationModule, LoggerModule, ValidatorModule, PipeModule } from 'common-lib';
import { UserRoutingModule } from './user-routing.module';

//Application Components
import { AuthComponent } from './auth/auth.component';
import { LoginPartialComponent } from './auth/login-partial/login-partial.component';
import { RegisterPartialComponent } from './auth/register-partial/register-partial.component';
import { ForgotPartialComponent } from './auth/forgot-partial/forgot-partial.component';
import { ResetPartialComponent } from './auth/reset-partial/reset-partial.component';

@NgModule({
  declarations: [
    AuthComponent, 
    LoginPartialComponent, 
    RegisterPartialComponent, 
    ForgotPartialComponent, 
    ResetPartialComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    //Routing Module
    UserRoutingModule,

    //Common Library
    TranslateModule,
    NotificationModule,
    ValidatorModule,
    PipeModule,
    LoggerModule,
  ],
  exports: [
    //ReactiveFormsModule
  ]
})
export class UserModule { }
