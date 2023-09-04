import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

//Application files
import { Globals } from 'projects/crm-backend-web/src/app/app.global';
import { IResponseUserLogin } from 'crm-lib';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router
  ) { }


  /**
   * Implement the method from CanActivate
   */
  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    let claim: IResponseUserLogin = this._globals.getClaim() as IResponseUserLogin;
    if (!(claim && claim.token)) {
      this._router.navigate(['/']);
      return false;
    } //End if

    return true;
  } //Function ends

} //Class ends
