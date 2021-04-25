import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

//Application global files
import { Globals } from 'projects/crmo-backend/src/app/app.global';
import { BaseComponent } from '../../../../../base.component';

//Application Libraries
import { NotificationService } from 'ellaisys-lib';
import { IUser } from 'crmo-lib';

@Component({
  selector: 'crmo-backend-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent  extends BaseComponent implements OnInit {
  @Input('form') userProfileForm: FormGroup = null;
  @Input('user') objUser: IUser = null;
  @Input('new') boolIsNew: boolean = false;
  @Input('refresh') boolRefresh: boolean = false;

  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;

  public strUserAvatar: string=null;
  public boolIsNewUser: boolean = false;

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
    private _notification : NotificationService
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

  } //Function ends

} //Class ends
