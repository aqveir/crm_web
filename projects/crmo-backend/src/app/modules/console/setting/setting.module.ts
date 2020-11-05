import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Application Modules
import { SettingRoutingModule } from './setting-routing.module';

// Application Components
import { OrganizationDetailComponent } from './organization/organization-detail/organization-detail.component';
import { OrganizationListComponent } from './organization/organization-list/organization-list.component';
import { OrganizationConfigurationComponent } from './organization/organization-configuration/organization-configuration.component';

import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';

@NgModule({
  declarations: [
    OrganizationListComponent,
    OrganizationDetailComponent,

    UserListComponent,

    UserDetailComponent,

    OrganizationConfigurationComponent,
    
  ],
  imports: [
    CommonModule,
    SettingRoutingModule
  ]
})
export class SettingModule { }
