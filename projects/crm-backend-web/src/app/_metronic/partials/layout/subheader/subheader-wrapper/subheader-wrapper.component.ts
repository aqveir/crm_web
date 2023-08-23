import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ResolveEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { SubheaderService } from '../_services/subheader.service';
import { KTUtil } from '@asset-backend/js/components/util';
import KTLayoutSubheader from '@asset-backend/js/layout/base/subheader';

@Component({
  selector: 'app-subheader-wrapper',
  templateUrl: './subheader-wrapper.component.html',
})
export class SubheaderWrapperComponent implements OnInit, AfterViewInit {
  subheaderVersion$: Observable<string>;

  constructor(
    private subheader: SubheaderService, 
    private router: Router
  ) {
    this.subheader.setDefaultSubheader();
    this.subheaderVersion$ = this.subheader.subheaderVersionSubject.asObservable();

    const initSubheader = () => {
      setTimeout(() => {
        this.subheader.updateAfterRouteChanges(this.router.url);
      }, 0);
    };

    initSubheader();

    // subscribe to router events
    this.router.events
      .pipe(filter((event) => event instanceof ResolveEnd))
      .subscribe(initSubheader);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    KTUtil.ready(() => {
      KTLayoutSubheader.init('kt_subheader');
    });
  }
  
}
