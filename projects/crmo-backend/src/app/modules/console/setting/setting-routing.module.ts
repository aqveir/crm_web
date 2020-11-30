import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Application Components
import { OrganizationListComponent } from './organization/organization-list/organization-list.component';
import { OrganizationDetailComponent } from './organization/organization-detail/organization-detail.component';
import { OrganizationConfigurationDataComponent } from './organization/organization-detail/organization-configuration-data/organization-configuration-data.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';

const routes: Routes = [
  { path: 'organization', component: OrganizationListComponent },
  { path: 'organization/:ohash', component: OrganizationDetailComponent },
  { path: 'organization/:ohash/configuration/:key', component: OrganizationConfigurationDataComponent },
  { path: 'organization/ohash/user', component: UserListComponent },
  { path: 'organization/:ohash/user/:uhash', component: UserDetailComponent },
  { path: '', pathMatch: 'full', redirectTo: 'organizations' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
