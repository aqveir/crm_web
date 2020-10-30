import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';

import { AuthComponent } from './auth/auth.component';
import { LoginPartialComponent } from './auth/login-partial/login-partial.component';
import { RegisterPartialComponent } from './auth/register-partial/register-partial.component';
import { ForgotPartialComponent } from './auth/forgot-partial/forgot-partial.component';

@NgModule({
  declarations: [
    AuthComponent, 
    LoginPartialComponent, 
    RegisterPartialComponent, 
    ForgotPartialComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,

    UserRoutingModule
  ]
})
export class UserModule { }
