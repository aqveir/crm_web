import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeadListComponent } from './lead-list/lead-list.component';

const routes: Routes = [
  { path: '', component: LeadListComponent },
  //{ path: ':chash', component: ContactDetailComponent },
  //{ path: '', pathMatch: 'full', redirectTo: 'new' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadRoutingModule { }
