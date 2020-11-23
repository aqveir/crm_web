import { Component, OnInit, AfterViewInit } from '@angular/core';

import { LayoutService } from '../../../../../_metronic/core';
import { KTUtil } from '@asset-backend/js/components/util';
import KTLayoutAsideToggle from '@asset-backend/js/layout/base/aside-toggle';
import KTLayoutStickyCard from '@asset-backend/js/layout/base/sticky-card';
import KTLayoutStretchedCard from '@asset-backend/js/layout/base/stretched-card';
import KTLayoutBrand from '@asset-backend/js/layout/base/brand';
import KTLayoutAside from '@asset-backend/js/layout/base/aside';
import KTLayoutAsideMenu from '@asset-backend/js/layout/base/aside-menu';

@Component({
  selector: 'app-scripts-init',
  templateUrl: './scripts-init.component.html',
})
export class ScriptsInitComponent implements OnInit, AfterViewInit {
  boolAsideSelfMinimizeToggle = false;

  constructor(private layout: LayoutService) { }

  ngOnInit(): void {
    this.boolAsideSelfMinimizeToggle = this.layout.getProp('aside.self.minimize.toggle');
  }

  ngAfterViewInit() {
    KTUtil.ready(() => {
      // Init Brand Panel For Logo
      KTLayoutBrand.init('kt_brand');

      // Init Aside
      KTLayoutAside.init('kt_aside');

      // Init Aside Menu
      KTLayoutAsideMenu.init('kt_aside_menu');

      if (this.boolAsideSelfMinimizeToggle) {
        // Init Aside Menu Toggle
        KTLayoutAsideToggle.init('kt_aside_toggle');
      }

      // Init Sticky Card
      KTLayoutStickyCard.init('kt_page_sticky_card');

      // Init Stretched Card
      KTLayoutStretchedCard.init('kt_page_stretched_card');
    });
  }
} //Class ends
