import { Injectable, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule, RouterStateSnapshot, Routes, TitleStrategy, mapToCanActivate } from '@angular/router';

//Guard Service
import { AuthGuardService as AuthGuard } from './guards/auth-guard/auth-guard.service';

const routes: Routes = [
  { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  { path: 'secure', canActivate: mapToCanActivate([AuthGuard]), loadChildren: () => import('./modules/console/console.module').then(m => m.ConsoleModule) },
  { path: 'error', loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule) },
  { path: '', pathMatch: 'full', redirectTo: 'user/login' },
  { path: '**', redirectTo: 'error/404' },
];


@Injectable({providedIn: 'root'})
export class TemplatePageTitleStrategy extends TitleStrategy {

  /**
   * Constructor
   * @param title 
   */
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(_routerState: RouterStateSnapshot) {
    const title = this.buildTitle(_routerState);
    if (title !== undefined) {
      this.title.setTitle(`My Application | ${title}`);
    } // End if
  }
} //Class ends

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
    providers: [
      { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
  ]
})
export class AppRoutingModule { }


