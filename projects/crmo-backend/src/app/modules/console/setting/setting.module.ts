import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Application Modules
import { SettingRoutingModule } from './setting-routing.module';
import { LoggerModule, NotificationModule, PipeModule, TranslateModule, ValidatorModule, IntlTelInputModule } from 'ellaisys-lib';

// Application Components
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';

import { OrganizationListComponent } from './organization/organization-list/organization-list.component';
import { OrganizationDetailComponent } from './organization/organization-detail/organization-detail.component';
import { OrganizationDataComponent } from './organization/organization-detail/organization-data/organization-data.component';
import { OrganizationConfigurationListComponent } from './organization/organization-detail/organization-configuration-list/organization-configuration-list.component';
import { OrganizationConfigurationDataComponent } from './organization/organization-detail/organization-configuration-data/organization-configuration-data.component';
import { OrganizationMailTemplateListComponent } from './organization/organization-detail/organization-mail-template-list/organization-mail-template-list.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,

    OrganizationListComponent,
    OrganizationDetailComponent,
    OrganizationDataComponent,
    OrganizationConfigurationDataComponent,
    OrganizationMailTemplateListComponent,
    OrganizationConfigurationListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,

    //EllaiSys Library
    TranslateModule,
    NotificationModule,
    ValidatorModule,
    PipeModule,
    LoggerModule,
    IntlTelInputModule,

    //Application Modules
    SettingRoutingModule
  ]
})
export class SettingModule { }
