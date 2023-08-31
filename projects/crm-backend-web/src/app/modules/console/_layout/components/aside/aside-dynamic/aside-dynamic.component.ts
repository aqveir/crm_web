import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

// Application files
import { Globals, SettingInfo } from 'projects/crm-backend-web/src/app/app.global';

// Application Services
import { LayoutService, DynamicAsideMenuService } from '../../../../../../_metronic/core';


@Component({
  selector: 'app-aside-dynamic',
  templateUrl: './aside-dynamic.component.html',
  styleUrls: ['./aside-dynamic.component.scss']
})
export class AsideDynamicComponent implements OnInit, OnDestroy {
  @Input('menu') objAsideSubMenu: any = null;

  private objSettingInfo: SettingInfo;
  
  menuConfig: any;
  subscriptions: Subscription[] = [];

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
    private _global: Globals,
    private layout: LayoutService,
    private _router: Router,
    private menu: DynamicAsideMenuService,
    private cdr: ChangeDetectorRef
  ) {     
    //Get Setting Model
    this.objSettingInfo = this._global.getSettingInfo();
  }


  /**
   * Lifecycle Hook's
   */
  ngOnInit(): void {
    // Load view settings
    this.brandSkin = this.layout.getProp('brand.self.theme');
    this.headerLogo = this.getLogo();
    this.ulCSSClasses = this.layout.getProp('aside_menu_nav');
    this.asideMenuCSSClasses = this.layout.getStringCSSClasses('aside_menu');
    this.asideMenuHTMLAttributes = this.layout.getHTMLAttributes('aside_menu');
    this.asideMenuDropdown = this.layout.getProp('aside.menu.dropdown') ? '1' : '0';
    this.brandClasses = this.layout.getProp('brand');
    this.boolAsideSelfMinimizeToggle = this.layout.getProp('aside.self.minimize.toggle');
    this.asideMenuScroll = this.layout.getProp('aside.menu.scroll') ? 1 : 0;
    this.asideMenuCSSClasses = `${this.asideMenuCSSClasses} ${this.asideMenuScroll === 1 ? 'scroll my-4 ps ps--active-y' : ''}`;

    // router subscription
    //this.currentUrl = this._router.url.split(/[?#]/)[0];
    // const routerSubscr = this._router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((event: any) => {
    //   this.currentUrl = event.url;
    //   this.cdr.detectChanges();
    // });
    // this.subscriptions.push(routerSubscr);

    // menu load
    // const menuSubscr = this.menu.menuConfig$.subscribe(res => {
    //   this.menuConfig = res;
    //   this.cdr.detectChanges();
    // });
    // this.subscriptions.push(menuSubscr);
  }
  ngOnDestroy() {
    // this.subscriptions.forEach(sb => sb.unsubscribe());
  }


  private getLogo() {
    if (this.brandSkin === 'light') {
      return './assets/media/logos/logo-dark.png';
    } else {
      return './assets/media/logos/logo-light.png';
    }
  }


  public isMenuItemActive(path: string) {
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


  public fnProcessMenuSelection(elem: Element, item: any): boolean {
    let objReturnValue: boolean = false;
    try {
      // Handle Submenu
      if (item.submenu) {
        //Toggle menu
        if (elem.classList.contains('menu-item-open')) {
          elem.classList.remove('menu-item-open');
        } else {
          elem.classList.add('menu-item-open');
        } //End if        
      } //End if

      // Navigate for valid url
      if (item.path && item.path!='' && this.objSettingInfo) {
        //Change the oHash to selected organization
        let pathRoute: any = item.path.replace(/{oHash}/gi, this.objSettingInfo.selected_oHash);
        
        this._router.navigate(pathRoute);
      } //End if

    } catch(error) {
      throw error;
    } //Try-catch ends
    return objReturnValue;
  } //Function ends

  public fnMenuLink(item: any): string[] {
    let objReturnValue: string[] = [];

    try {
      // Navigate for valid url
      if (item.page && item.page!='' && this.objSettingInfo) {
        let strMenupath: string = item.page;
        let strSearch = /oHash/gi;

        //Change the oHash to selected organization
        strMenupath = strMenupath.replace(strSearch, this.objSettingInfo.selected_oHash);
        objReturnValue[0]=strMenupath;
      } //End if
    } catch(error) {
      objReturnValue = [];
      console.error(error);
    } //Try-catch ends

    return objReturnValue;
  } //Function ends

}
