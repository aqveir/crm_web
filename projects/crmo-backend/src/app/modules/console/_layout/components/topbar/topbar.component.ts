import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../../../_metronic/core';
//import { AuthService } from '../../../../modules/auth/_services/auth.service';
//import { UserModel } from '../../../../modules/auth/_models/user.model';
import KTLayoutQuickSearch from '@asset-backend/js/layout/extended/quick-search';
import KTLayoutQuickNotifications from '@asset-backend/js/layout/extended/quick-notifications';
import KTLayoutQuickActions from '@asset-backend/js/layout/extended/quick-actions';
import KTLayoutQuickCartPanel from '@asset-backend/js/layout/extended/quick-cart';
import KTLayoutQuickPanel from '@asset-backend/js/layout/extended/quick-panel';
import KTLayoutQuickUser from '@asset-backend/js/layout/extended/quick-user';
import KTLayoutHeaderTopbar from '@asset-backend/js/layout/base/header-topbar';
import { KTUtil } from '@asset-backend/js/components/util';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, AfterViewInit {
  //user$: Observable<UserModel>;
  // tobbar extras
  extraSearchDisplay: boolean = false;
  extrasSearchLayout: 'offcanvas' | 'dropdown';
  extrasNotificationsDisplay: boolean = false;
  extrasNotificationsLayout: 'offcanvas' | 'dropdown';
  extrasQuickActionsDisplay: boolean = false;
  extrasQuickActionsLayout: 'offcanvas' | 'dropdown';
  extrasCartDisplay: boolean = false;
  extrasCartLayout: 'offcanvas' | 'dropdown';
  extrasQuickPanelDisplay: boolean = false;
  extrasLanguagesDisplay: boolean = false;
  extrasUserDisplay: boolean = false;
  extrasUserLayout: 'offcanvas' | 'dropdown';

  constructor(
    private layout: LayoutService, 
    //private auth: AuthService
    ) {
    //this.user$ = this.auth.currentUserSubject.asObservable();
  }

  ngOnInit(): void {
    // topbar extras

    console.log('extras.init');
    
    this.extraSearchDisplay = this.layout.getProp('extras.search.display');
    this.extrasSearchLayout = this.layout.getProp('extras.search.layout');

    this.extrasNotificationsDisplay = this.layout.getProp('extras.notifications.display');
    this.extrasNotificationsLayout = this.layout.getProp('extras.notifications.layout');

    console.log({
      'extrasNotificationsDisplay': this.extrasNotificationsDisplay,
      'extrasNotificationsLayout': this.extrasNotificationsLayout
    });

    this.extrasQuickActionsDisplay = this.layout.getProp('extras.quickActions.display');
    this.extrasQuickActionsLayout = this.layout.getProp('extras.quickActions.layout');

    this.extrasCartDisplay = this.layout.getProp('extras.cart.display');
    this.extrasCartLayout = this.layout.getProp('extras.cart.layout');

    this.extrasLanguagesDisplay = this.layout.getProp(
      'extras.languages.display'
    );
    this.extrasUserDisplay = this.layout.getProp('extras.user.display');
    this.extrasUserLayout = this.layout.getProp('extras.user.layout');
    this.extrasQuickPanelDisplay = this.layout.getProp(
      'extras.quickPanel.display'
    );
  }

  ngAfterViewInit(): void {
    KTUtil.ready(() => {
      // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      // Add 'implements AfterViewInit' to the class.
      if (this.extraSearchDisplay && this.extrasSearchLayout === 'offcanvas') {
        KTLayoutQuickSearch.init('kt_quick_search');
      }

      if (
        this.extrasNotificationsDisplay &&
        this.extrasNotificationsLayout === 'offcanvas'
      ) {
        // Init Quick Notifications Offcanvas Panel
        KTLayoutQuickNotifications.init('kt_quick_notifications');
      }

      if (
        this.extrasQuickActionsDisplay &&
        this.extrasQuickActionsLayout === 'offcanvas'
      ) {
        // Init Quick Actions Offcanvas Panel
        KTLayoutQuickActions.init('kt_quick_actions');
      }

      if (this.extrasCartDisplay && this.extrasCartLayout === 'offcanvas') {
        // Init Quick Cart Panel
        KTLayoutQuickCartPanel.init('kt_quick_cart');
      }

      if (this.extrasQuickPanelDisplay) {
        // Init Quick Offcanvas Panel
        KTLayoutQuickPanel.init('kt_quick_panel');
      }

      if (this.extrasUserDisplay && this.extrasUserLayout === 'offcanvas') {
        // Init Quick User Panel
        KTLayoutQuickUser.init('kt_quick_user');
      }

      // Init Header Topbar For Mobile Mode
      KTLayoutHeaderTopbar.init('kt_header_mobile_topbar_toggle');
    });
  }
}
