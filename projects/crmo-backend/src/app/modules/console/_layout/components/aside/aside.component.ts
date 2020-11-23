import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


// Application files
import { Globals } from 'projects/crmo-backend/src/app/app.global';

// Application Services
import { LayoutService, DynamicAsideMenuService } from '../../../../../_metronic/core';
import { KTUtil } from '@asset-backend/js/components/util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit, OnDestroy {
  public objMenuTab: any = null;
  public boolDisableAsideSecondaryDisplay: boolean = false;

  private tabSubscriptions: Subscription[] = [];


  TABS: string[] = [
    'kt_aside_tab_0',
    'kt_aside_tab_1',
    'kt_aside_tab_2',
    'kt_aside_tab_3',
    'kt_aside_tab_4',
    'kt_aside_tab_5',
    'kt_aside_tab_6'];
  activeTabId;
  disableAsideSelfDisplay: boolean;
  
  ulCSSClasses: string;
  asideMenuHTMLAttributes: any = {};
  asideMenuCSSClasses: string;
  asideMenuDropdown;
  brandClasses: string;
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
    private _layoutService: LayoutService,
    private _menuService: DynamicAsideMenuService,
    private _cdr: ChangeDetectorRef
  ) { }


  /**
   * LifeCycle Hooks
   */
  ngOnInit(): void {
    this.activeTabId = this.TABS[1];

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
    this.boolDisableAsideSecondaryDisplay = this._layoutService.getProp('aside.secondary.display');

    // Menu load
    const menuSubscr = this._menuService.menuConfig$.subscribe((response: any) => {
      this.objMenuTab = response;
      this._cdr.detectChanges();
    });
    this.tabSubscriptions.push(menuSubscr);

  } //Function ends
  ngOnDestroy() {
    this.tabSubscriptions.forEach(x => x.unsubscribe());
  } //Function ends


  /**
   * Select the selected Tab
   * 
   * @param _tab 
   */
  public fnSelectTab(_tab: any) {
    //Show Secondary Aside
    if (_tab.submenu) {
      this.boolDisableAsideSecondaryDisplay=false;
    } //End if

    //this.activeTabId = _tab;

    const asideWorkspace = KTUtil.find(
      document.getElementById('kt_aside'),
      '.aside-secondary .aside-workspace'
    );

    if (asideWorkspace) {
      KTUtil.scrollUpdate(asideWorkspace);
    } //End if

    this._cdr.detectChanges();
  } //Function ends

} //Class ends
