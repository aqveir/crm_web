import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

//Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';

//Application Files
import { BaseComponent } from '../../../base.component';
import { EventBrokerService } from 'common-lib';

@Component({
  selector: 'crmo-backend-widget-subheader',
  templateUrl: './widget-subheader.component.html',
  styleUrls: ['./widget-subheader.component.scss']
})
export class WidgetSubheaderComponent extends BaseComponent implements OnInit {
  @Input('title') strTitle: string=null;
  @Input('page-info') strPageInformation: string=null;
  @Input('routerLinkAdd') strRouterLinkAddBtn: string|any[]=null;
  @Input('search') boolShowSearchControl: boolean=false;
  @Input('searchFull') boolShowFullSearchControl: boolean=false;
  @Input('filter') boolShowFilterButton: boolean=false;
  @Input('save') boolShowSaveButton: boolean=false;
  @Input('save-group') boolShowSaveButtonGroup: boolean=false;
  @Input('back') boolShowBackButton: boolean=false;
  @Input('loading') boolShowLoading: boolean=false;
  @Output('back') btnBack: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('search') strSearch: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Default constructor
   */
  constructor(
    private _globals: Globals,
    private _broker: EventBrokerService
  ) {
    super();
  }


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


  public fnSearch(event): void {
    try {
      if (event && event.target) {
        let strSearch: string =  event.target?.value;
        if (strSearch) {
          strSearch = strSearch.trim();
          this.strSearch.emit(strSearch);
        } //End if
      } //End if
    } catch(error) {
      throw error;
    } //try-catch ends
  } //Function ends
  

  /**
   * Back Button Emitter
   */
  public fnBackClick(): void {
    this.btnBack.emit(true);
  } //Function ends


  /**
   * Filter Button Emitter
   */
  public fnFilterClick(event): void {
    this._broker.emit<any>('show_page_filter', event);
  } //Function ends

} //Class ends
