import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../../../base.component';

//Application Libraries
import { NotificationService } from 'ellaisys-lib';
import { IUser } from 'crmo-lib';
import { interval } from 'rxjs';

@Component({
  selector: 'crmo-backend-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent  extends BaseComponent implements OnInit {
  @Input('form') userAccountForm: FormGroup = null;
  @Input('user') objUser: IUser = null;
  @Input('new') boolIsNew: boolean = false;
  @Input('refresh') boolRefresh: boolean = false;

  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;

  public listLanguages: any;
  public boolValidatingUsername: boolean = false;
  

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
    private _notification: NotificationService,
  ) { super(); }


  /**
   * Lifecycle Hook's
   */
  ngOnInit(): void {

    //Initilaize component
    this.fnInitialize();
  } //Function ends

  
  /**
   * Initialize
   */
  private fnInitialize(): void {
    //Load languages supported
    let listLanguages: [] = Globals.APPLICATION_CONSTANT.LANGUAGES;
    this.listLanguages = listLanguages.filter((x: any) => { return x.is_active==true });
  } //Function ends


  public fnToggleActiveActon(): void {
    let boolCurrActiveState: boolean = (this.userAccountForm.contains('is_active'))?(this.userAccountForm.controls['is_active'].value):false;
    
    this.userAccountForm.patchValue({
      is_active: !boolCurrActiveState
    });
  } //Function ends


  /**
   * Validate Username for Duplicate
   * @param event 
   */
  public fnValidateUsername(event): void {
    let username: string = event?.target?.value;

    if (username.length>=3) {
      this.boolValidatingUsername=true;
      console.log(event?.target?.value);

      interval(1000);
      //this.boolValidatingUsername=false;
    } //End if    
  } //Function ends

} //Class ends

