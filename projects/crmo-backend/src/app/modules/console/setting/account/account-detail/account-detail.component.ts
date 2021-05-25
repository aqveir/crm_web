import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../../base.component';

import { AccountService,IAccount,IAddress } from 'crmo-lib';
import { AddressComponent } from '../../../shared/address/address.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'crmo-backend-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent extends BaseComponent implements OnInit{

  //#region Public Variables

  public boolLoading: boolean = false;
  public boolSave: boolean = false;
  public hasError: boolean = false;

  public hash: string;
  public objAccount: IAccount;
  
  public boolRefresh: boolean = false;
  public boolIsNew: boolean = false;
  
  public accountForm!: FormGroup;

  //#endregion



  constructor(private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _accountService: AccountService
  ) { super(); }

  ngOnInit(): void {
  }



  /**
   * Get Data
   */
   public fnLoadData(): boolean {
    try {
        return true;
    } catch (error) {
     
      throw error;
    } //Try-catch ends
  } //Function ends



  /**
   * Reset form
   */
   public fnReset(boolNavBack: boolean=false): void {
    this.accountForm.reset();

    if (boolNavBack) {
      this._router.navigate(['secure/setting/organization']);
    } //End if
  } //Function ends

 
     public fnReload(hash: string): void {
      this.hash = hash;
      this.fnLoadData();
    } //Function ends
    
  
    /**
     * Save Data
     */
    public fnSave(event: any): boolean {
      try {
        
        return true;
      } catch (error) {
       
        throw error;
      } //Try-catch ends
    } //Function ends
}
