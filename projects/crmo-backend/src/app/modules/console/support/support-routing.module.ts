import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Application Components
import { SupportListComponent } from './support-list/support-list.component';
import { SupportDetailComponent } from './support-detail/support-detail.component';

const routes: Routes = [
  { path: '', component: SupportListComponent },
  { path: ':hash', component: SupportDetailComponent },
  //{ path: '', pathMatch: 'full', redirectTo: 'new' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
