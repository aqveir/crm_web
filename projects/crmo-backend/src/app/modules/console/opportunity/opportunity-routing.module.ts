import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Application Components
import { OpportunityListComponent } from './opportunity-list/opportunity-list.component';
import { OpportunityDetailComponent } from './opportunity-detail/opportunity-detail.component';

const routes: Routes = [
  { path: '', component: OpportunityListComponent },
  { path: ':hash', component: OpportunityDetailComponent },
  //{ path: '', pathMatch: 'full', redirectTo: 'new' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunityRoutingModule { }
