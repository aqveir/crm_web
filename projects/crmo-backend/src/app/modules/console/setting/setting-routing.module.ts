import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Application Components
import { OrganizationListComponent } from './organization/organization-list/organization-list.component';
import { OrganizationDetailComponent } from './organization/organization-detail/organization-detail.component';
import { OrganizationConfigurationDataComponent } from './organization/organization-detail/organization-configuration-data/organization-configuration-data.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleDetailComponent } from './role/role-detail/role-detail.component';
import { PreferenceListComponent } from './preference/preference-list/preference-list.component';
import { PreferenceDetailComponent } from './preference/preference-detail/preference-detail.component';

const routes: Routes = [
  { path: 'organization', component: OrganizationListComponent },
  { path: 'organization/:ohash', component: OrganizationDetailComponent },
  { path: 'organization/:ohash/configuration/:key', component: OrganizationConfigurationDataComponent },
  { path: 'organization/:ohash/user', component: UserListComponent },
  { path: 'organization/:ohash/user/:uhash', component: UserDetailComponent },
  { path: 'organization/:ohash/role', component: RoleListComponent },
  { path: 'organization/:ohash/role/:key', component: RoleDetailComponent },
  { path: 'organization/:ohash/preference', component: PreferenceListComponent },
  { path: 'organization/:ohash/preference/:id', component: PreferenceDetailComponent },
  { path: '', pathMatch: 'full', redirectTo: 'organizations' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
