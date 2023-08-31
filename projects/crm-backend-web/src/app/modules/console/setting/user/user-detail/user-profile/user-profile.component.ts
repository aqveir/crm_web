import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

//Application global files
import { Globals } from 'projects/crm-backend-web/src/app/app.global';
import { BaseComponent } from '../../../../../base.component';

//Application Libraries
import { NotificationService } from 'common-lib';
import { IUser } from 'crm-lib';

@Component({
  selector: 'crm-backend-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent  extends BaseComponent implements OnInit {
  @Input('form') userProfileForm: FormGroup = new FormGroup({});
  @Input('user') objUser: IUser|null = null;
  @Input('new') boolIsNew: boolean = false;
  @Input('refresh') boolRefresh: boolean = false;

  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;

  public strUserAvatar: string='';

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
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


  /**
   * Update Email Address event
   * 
   * @param event 
   */
  public fnUpdateEmailAddress(event: any): void {
    if (this.boolIsNew) {
      if (this.userProfileForm && (this.userProfileForm.controls['email'].valid)) {
        this.userProfileForm.patchValue({
          username: event?.target?.value
        });
      } //End if
    } //End if
  } //Function ends

} //Class ends
