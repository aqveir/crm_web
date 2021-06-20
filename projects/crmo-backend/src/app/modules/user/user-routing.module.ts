import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { LoginPartialComponent } from './auth/login-partial/login-partial.component';
import { RegisterPartialComponent } from './auth/register-partial/register-partial.component';
import { ForgotPartialComponent } from './auth/forgot-partial/forgot-partial.component';

const routes: Routes = [
  { path: '', component: AuthComponent, children: [
    { path: 'login', component: LoginPartialComponent },
    { path: 'register', component: RegisterPartialComponent },
    { path: 'forgot', component: ForgotPartialComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
