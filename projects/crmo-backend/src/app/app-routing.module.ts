import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from './guards/auth-guard/auth-guard.service';

const routes: Routes = [
  { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  { path: 'secure', canActivate: [AuthGuard], loadChildren: () => import('./modules/console/console.module').then(m => m.ConsoleModule) },
  { path: 'error', canActivate: [AuthGuard], loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule) },
  { path: '', pathMatch: 'full', redirectTo: 'user/login' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
