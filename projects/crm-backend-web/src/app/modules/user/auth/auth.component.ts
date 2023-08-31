import { Component, OnInit } from '@angular/core';

//Application global files
import { Globals } from 'projects/crm-backend-web/src/app/app.global';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'crm-backend-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent extends BaseComponent implements OnInit {

  /**
   * Default constructor
   */
  constructor(
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
