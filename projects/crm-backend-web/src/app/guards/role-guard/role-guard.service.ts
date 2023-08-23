import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

//Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {


  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _route: ActivatedRouteSnapshot, 
    private _state: RouterStateSnapshot
  ) { }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }
  
} //Class ends
