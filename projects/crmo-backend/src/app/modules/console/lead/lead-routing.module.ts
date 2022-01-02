import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeadListComponent } from './lead-list/lead-list.component';
import { LeadDetailComponent } from './lead-detail/lead-detail.component';

const routes: Routes = [
  { path: '', component: LeadListComponent },
  { path: ':hash', component: LeadDetailComponent },
  //{ path: '', pathMatch: 'full', redirectTo: 'new' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadRoutingModule { }
