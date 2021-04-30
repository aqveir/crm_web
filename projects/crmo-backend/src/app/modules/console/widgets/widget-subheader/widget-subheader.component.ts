import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'crmo-backend-widget-subheader',
  templateUrl: './widget-subheader.component.html',
  styleUrls: ['./widget-subheader.component.scss']
})
export class WidgetSubheaderComponent implements OnInit {
  @Input('title') strTitle: string=null;
  @Input('page-info') strPageInformation: string=null;
  @Input('routerLinkAdd') strRouterLinkAddBtn: string|any[]=null;
  @Input('save') boolShowSaveButton: boolean=false;
  @Input('save-group') boolShowSaveButtonGroup: boolean=false;
  @Input('back') boolShowBackButton: boolean=false;
  @Input('loading') boolShowLoading: boolean=false;
  @Output('back') btnBack: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  
  /**
   * Back Button Emitter
   */
  public fnBackClick(): void {
    this.btnBack.emit(true);
  } //Function ends

} //Class ends
