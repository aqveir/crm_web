import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

// Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';

// Application Services
import { LayoutService, DynamicAsideMenuService } from '../../../../../_metronic/core';

@Component({
  selector: 'app-aside-dynamic',
  templateUrl: './aside-dynamic.component.html',
  styleUrls: ['./aside-dynamic.component.scss']
})
export class AsideDynamicComponent implements OnInit, OnDestroy {

  public dataMenuAside: any|null;

  menuConfig: any;
  subscriptions: Subscription[] = [];

  disableAsideSelfDisplay: boolean = false;
  headerLogo: string = '';
  brandSkin: string = '';
  ulCSSClasses: string = '';
  asideMenuHTMLAttributes: any = {};
  asideMenuCSSClasses: string = '';
  asideMenuDropdown: any;
  brandClasses: string = '';
  asideMenuScroll = 1;
  boolAsideSelfMinimizeToggle = false;

  currentUrl: string = '';


  /**
   * Default constructor
   */
  constructor(
    private layout: LayoutService,
    private router: Router,
    private menu: DynamicAsideMenuService,
    private cdr: ChangeDetectorRef
  ) { }


  /**
   * Lifecycle Hook's
   */
  ngOnInit(): void {
    // load view settings
    this.disableAsideSelfDisplay = this.layout.getProp('aside.self.display') === false;
    this.brandSkin = this.layout.getProp('brand.self.theme');
    this.headerLogo = this.getLogo();
    this.ulCSSClasses = this.layout.getProp('aside_menu_nav');
    this.asideMenuCSSClasses = this.layout.getStringCSSClasses('aside_menu');
    console.log('asideMenuCSSClasses1->' + this.asideMenuCSSClasses);

    this.asideMenuHTMLAttributes = this.layout.getHTMLAttributes('aside_menu');
    this.asideMenuDropdown = this.layout.getProp('aside.menu.dropdown') ? '1' : '0';
    this.brandClasses = this.layout.getProp('brand');
    this.boolAsideSelfMinimizeToggle = this.layout.getProp('aside.self.minimize.toggle');
    this.asideMenuScroll = this.layout.getProp('aside.menu.scroll') ? 1 : 0;
    this.asideMenuCSSClasses = `${this.asideMenuCSSClasses} ${this.asideMenuScroll === 1 ? 'scroll my-4 ps ps--active-y' : ''}`;
    console.log('asideMenuCSSClasses2->' + this.asideMenuCSSClasses);

    // Router subscription
    this.currentUrl = this.router.url.split(/[?#]/)[0];
    const routerSubscr = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentUrl = event.url;
      this.cdr.detectChanges();
    });
    this.subscriptions.push(routerSubscr);

    // Menu Load
    const menuSubscr = this.menu.menuConfig$.subscribe((res: any) => {
      this.menuConfig = res;
      this.cdr.detectChanges();
    });
    this.subscriptions.push(menuSubscr);

  } //Function ends

  private getLogo() {
    if (this.brandSkin === 'light') {
      return './assets/media/logos/logo-dark.png';
    } else {
      return './assets/media/logos/logo-light.png';
    }
  }

  isMenuItemActive(path) {
    if (!this.currentUrl || !path) {
      return false;
    }

    if (this.currentUrl === path) {
      return true;
    }

    if (this.currentUrl.indexOf(path) > -1) {
      return true;
    }

    return false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
} //Class ends
