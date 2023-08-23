import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from '../../guards/auth-guard/auth-guard.service';

import { LayoutComponent } from '../console/_layout/layout.component';
import { HttpErrorComponent } from './http-error/http-error.component';

const routes: Routes = [
  { path: 'global/:code', component: HttpErrorComponent, data: {code: 400} },
  { path: 'global', pathMatch: 'full', redirectTo: 'global/404' },
  { path: '', canActivate: [AuthGuard], component: LayoutComponent, children: [
    { path: ':code', component: HttpErrorComponent, data: {code: 400} },
    { path: '', pathMatch: 'full', redirectTo: '404' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
