import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Application Components
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';

const routes: Routes = [
  { path: '', component: AccountListComponent },
  { path: ':chash', component:AccountDetailComponent },
  //{ path: '', pathMatch: 'full', redirectTo: 'new' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
