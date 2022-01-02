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
import { AccountListComponent } from './account/account-list/account-list.component';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { SubscriptionListComponent } from './subscription/subscription-list/subscription-list.component';
import { SubscriptionDetailComponent } from './subscription/subscription-detail/subscription-detail.component';
import { SubscriptionAddComponent } from './subscription/subscription-add/subscription-add.component';

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
  { path: 'organization/:ohash/account', component: AccountListComponent },
  { path: 'organization/:ohash/account/:key', component: AccountDetailComponent},
  { path: 'organization/:ohash/subscription', component: SubscriptionListComponent },
  { path: 'organization/:ohash/subscription/new', component: SubscriptionAddComponent },
  { path: 'organization/:ohash/subscription/:uuid', component: SubscriptionDetailComponent },
  { path: '', pathMatch: 'full', redirectTo: 'organizations' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
