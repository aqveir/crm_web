import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Application files
import { Globals } from 'projects/crm-backend-web/src/app/app.global';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'crm-backend-http-error',
  templateUrl: './http-error.component.html',
  styleUrls: ['./http-error.component.scss']
})
export class HttpErrorComponent extends BaseComponent implements OnInit {
  //Common attributes
  public boolLoading: boolean = false;
  public hasError: boolean = false;

  public code: string = '';

  /**
   * Default constructor
   */
   constructor(
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute,
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
    let code: string|null = this._route.snapshot.paramMap.get('code');
    this.code = code?code:'';

  } //Function ends

} //Class ends
