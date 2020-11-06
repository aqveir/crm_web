import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg';

import {
  NgbDropdownModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap';
//import { TranslationModule } from '../modules/i18n/translation.module';

//Application Module
import { TranslateModule, NotificationModule, LoggerModule, ValidatorModule, PipeModule } from 'ellaisys-lib';
import { CoreModule } from '../../../_metronic/core';
import { SubheaderModule } from '../../../_metronic/partials/layout/subheader/subheader.module';

import { LayoutComponent } from './layout.component';
import { ScriptsInitComponent } from './init/scipts-init/scripts-init.component';
import { HeaderMobileComponent } from './components/header-mobile/header-mobile.component';
import { AsideComponent } from './components/aside/aside.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderMenuComponent } from './components/header/header-menu/header-menu.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ExtrasModule } from '../../../_metronic/partials/layout/extras/extras.module';
import { LanguageSelectorComponent } from './components/topbar/language-selector/language-selector.component';
import { AsideDynamicComponent } from './components/aside-dynamic/aside-dynamic.component';
import { HeaderMenuDynamicComponent } from './components/header/header-menu-dynamic/header-menu-dynamic.component';


@NgModule({
  declarations: [
    LayoutComponent,
    ScriptsInitComponent,
    HeaderMobileComponent,
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    TopbarComponent,
    LanguageSelectorComponent,
    AsideDynamicComponent,
    HeaderMenuDynamicComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    //TranslationModule,
    InlineSVGModule,
    ExtrasModule,
    NgbDropdownModule,
    NgbProgressbarModule,

    //EllaiSys Library
    TranslateModule,
    NotificationModule,
    ValidatorModule,
    PipeModule,
    LoggerModule,

    CoreModule,
    SubheaderModule,
  ],
  exports: [
    LayoutComponent,
    ScriptsInitComponent,
    HeaderMobileComponent,
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    TopbarComponent,
    LanguageSelectorComponent,
    AsideDynamicComponent,
    HeaderMenuDynamicComponent,
  ]
})
export class LayoutModule { }
