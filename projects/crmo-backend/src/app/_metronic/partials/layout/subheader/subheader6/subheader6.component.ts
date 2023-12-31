import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbItemModel } from '../_models/breadcrumb-item.model';
import { LayoutService } from '../../../../core';
import { SubheaderService } from '../_services/subheader.service';

@Component({
  selector: 'app-subheader6',
  templateUrl: './subheader6.component.html',
})
export class Subheader6Component implements OnInit {
  public subheaderCSSClasses = '';
  public subheaderContainerCSSClasses = '';
  public subheaderMobileToggle = false;
  public subheaderDisplayDesc = false;
  public subheaderDisplayDaterangepicker = false;

  public title$: Observable<string>;
  public breadcrumbs$: Observable<BreadcrumbItemModel[]>;
  public description$: Observable<string>;

  constructor(
    private layout: LayoutService,
    private subheader: SubheaderService
  ) {
    this.title$ = this.subheader.titleSubject.asObservable();
    this.breadcrumbs$ = this.subheader.breadCrumbsSubject.asObservable();
    this.description$ = this.subheader.descriptionSubject.asObservable();
  }

  ngOnInit() {
    this.subheaderCSSClasses = this.layout.getStringCSSClasses('subheader');
    this.subheaderContainerCSSClasses = this.layout.getStringCSSClasses('subheader_container');
    this.subheaderMobileToggle = this.layout.getProp('subheader.mobileToggle');
    this.subheaderDisplayDesc = this.layout.getProp('subheader.displayDesc');
    this.subheaderDisplayDaterangepicker = this.layout.getProp('subheader.displayDaterangepicker');
  }
}
