import { ChangeDetectorRef, Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';

// Application files
import { Globals } from 'projects/crm-backend-web/src/app/app.global';

// Application Services
import { LayoutService, DynamicAsideMenuService } from '../../../../../_metronic/core';
import { KTUtil } from '@asset-backend/js/components/util';
import { Router } from '@angular/router';
import { EventBrokerService } from 'common-lib';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit, OnDestroy {
  public objMenuTab: any = null;
  public objAsideSubMenu: any = null;
  public boolShowAsideSecondaryDisplay: boolean = false;

  public currentPage: string = '';

  activeTabId: any;
  disableAsideSelfDisplay: boolean=false;
  
  ulCSSClasses: string='menu-nav';
  asideMenuHTMLAttributes: any = {};
  asideMenuCSSClasses: string='';
  asideMenuDropdown: any;
  brandClasses: string='';
  asideMenuScroll = 1;
  boolAsideSelfMinimizeToggle = false;


  /**
   * Default constructor
   * 
   * @param _layoutService 
   * @param _menuService 
   * @param _cdr 
   */
  constructor(
    private _globals: Globals,
    private _renderer: Renderer2,
    private _layoutService: LayoutService,
    private _router: Router,
    private _menuService: DynamicAsideMenuService,
    private _cdr: ChangeDetectorRef,
    private _broker: EventBrokerService
  ) { }


  /**
   * LifeCycle Hooks
   */
  ngOnInit(): void {
    // Load settings
    this.disableAsideSelfDisplay = this._layoutService.getProp('aside.self.display') === false;
    this.ulCSSClasses = this._layoutService.getProp('aside_menu_nav');
    this.asideMenuCSSClasses = this._layoutService.getStringCSSClasses('aside_menu');
    this.asideMenuHTMLAttributes = this._layoutService.getHTMLAttributes('aside_menu');
    this.asideMenuDropdown = this._layoutService.getProp('aside.menu.dropdown') ? '1' : '0';
    this.brandClasses = this._layoutService.getProp('brand');
    this.boolAsideSelfMinimizeToggle = this._layoutService.getProp('aside.self.minimize.toggle');
    this.asideMenuScroll = this._layoutService.getProp('aside.menu.scroll') ? 1 : 0;
    this.asideMenuCSSClasses = `${this.asideMenuCSSClasses} ${this.asideMenuScroll === 1 ? 'scroll my-4 ps ps--active-y' : ''}`;
    //this.boolShowAsideSecondaryDisplay = this._layoutService.getProp('aside.secondary.display');

    // Menu load
    this._menuService.menuConfig$.subscribe((response: any) => {
      this.objMenuTab = response;
      this._cdr.detectChanges();
    });

    //Set current page on reload
    this.currentPage = this._router?.routerState?.snapshot?.url;

    //Initialize the broker and set into listen mode
    this._broker.listen<boolean>(Globals.EVENT_SHOW_SUBMENU, ((x: boolean) => {
      this.fnToggleSecondaryAsideMenu(x);
    }));
  } //Function ends
  ngOnDestroy() {
    //this.tabSubscriptions.forEach(x => x.unsubscribe());
  } //Function ends


  /**
   * Select the selected Tab
   * 
   * @param _tab 
   */
  public fnSelectTab(_tab: any) {

    if (_tab.submenu) {
      this.objAsideSubMenu = _tab.submenu;

      //Set selected page
      this.currentPage=_tab.name;

      // Show Secondary Aside
      this.boolShowAsideSecondaryDisplay=true;
      this.fnToggleSecondaryAsideMenu(true);
    } else {
      //Set selected page
      this.currentPage=_tab.page;

      this.objAsideSubMenu = null;

      // Hide Secondary Aside
      this.boolShowAsideSecondaryDisplay=false;
      this.fnToggleSecondaryAsideMenu(false);
    } //End if

    //this.activeTabId = _tab;

    // const asideWorkspace = KTUtil.find(
    //   document.getElementById('kt_aside'),
    //   '.aside-secondary .aside-workspace'
    // );

    // if (asideWorkspace) {
    //   KTUtil.scrollUpdate(asideWorkspace);
    // } //End if

    this._cdr.detectChanges();
  } //Function ends


  public fnValidateUserPrivileges(_tab: any): boolean {
    let objReturnValue: boolean = false;

    if (_tab && _tab.permission) {
      let permissions: string[] = _tab.permission;

      objReturnValue = true;
      permissions.forEach((permission: string) => {
        objReturnValue = this._globals.fnCheckUserPrivilege(permission) && objReturnValue;
      });
    } else {
      objReturnValue = true;
    } //End if

    return objReturnValue;
  } //End if


  /**
   * Toggle the Aside Secondary Menu
   * 
   * @param showSecondaryAside 
   */
  private fnToggleSecondaryAsideMenu(showSecondaryAside: boolean=false): void {
    if (showSecondaryAside) {
      this._renderer.removeClass(document.body, 'aside-minimize');
    } else {
      this._renderer.addClass(document.body, 'aside-minimize');
    } //End if
  } //Function ends

} //Class ends
