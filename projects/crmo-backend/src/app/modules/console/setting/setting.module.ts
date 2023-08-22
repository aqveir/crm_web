import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Application Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoggerModule, NotificationModule, PipeModule, TranslateModule, ValidatorModule, IntlTelInputModule } from 'common-lib';
import { SettingRoutingModule } from './setting-routing.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { LayoutModule } from '../_layout/layout.module';

// Application Components
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleDetailComponent } from './role/role-detail/role-detail.component';

import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserProfileComponent } from './user/user-detail/user-profile/user-profile.component';
import { UserAccountComponent } from './user/user-detail/user-account/user-account.component';
import { UserSettingComponent } from './user/user-detail/user-setting/user-setting.component';
import { UserChangepasswordComponent } from './user/user-detail/user-changepassword/user-changepassword.component';

import { OrganizationListComponent } from './organization/organization-list/organization-list.component';
import { OrganizationDetailComponent } from './organization/organization-detail/organization-detail.component';
import { OrganizationDataComponent } from './organization/organization-detail/organization-data/organization-data.component';
import { OrganizationConfigurationListComponent } from './organization/organization-detail/organization-configuration-list/organization-configuration-list.component';
import { OrganizationConfigurationDataComponent } from './organization/organization-detail/organization-configuration-data/organization-configuration-data.component';
import { OrganizationMailTemplateListComponent } from './organization/organization-detail/organization-mail-template-list/organization-mail-template-list.component';
import { PreferenceListComponent } from './preference/preference-list/preference-list.component';
import { PreferenceDetailComponent } from './preference/preference-detail/preference-detail.component';
import {AccountListComponent} from './account/account-list/account-list.component';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { SubscriptionListComponent } from './subscription/subscription-list/subscription-list.component';
import { SubscriptionDetailComponent } from './subscription/subscription-detail/subscription-detail.component';
import { SubscriptionAddComponent } from './subscription/subscription-add/subscription-add.component';



@NgModule({
  declarations: [
    RoleListComponent,
    RoleDetailComponent,

    UserListComponent,
    UserDetailComponent,
    UserProfileComponent,
    UserAccountComponent,
    UserSettingComponent,
    UserChangepasswordComponent,    

    OrganizationListComponent,
    OrganizationDetailComponent,
    OrganizationDataComponent,
    OrganizationConfigurationDataComponent,
    OrganizationMailTemplateListComponent,
    OrganizationConfigurationListComponent,
    PreferenceListComponent,
    PreferenceDetailComponent,

    AccountListComponent,
    AccountDetailComponent,
    //AccountDataComponent,
    
    SubscriptionListComponent,
    SubscriptionDetailComponent,
    SubscriptionAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,

    //Imported Modules
    NgbModule,
    NgSelectModule,

    //EllaiSys Library
    TranslateModule,
    NotificationModule,
    ValidatorModule,
    PipeModule,
    LoggerModule,
    IntlTelInputModule,

    //Application Modules
    WidgetsModule,
    LayoutModule,
    SettingRoutingModule
  ]
})
export class SettingModule { }
