import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './_layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkQueueComponent } from './work-queue/work-queue.component';
import { TaskListComponent } from './task-list/task-list.component';
import { EventListComponent } from './event-list/event-list.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'queue', component: WorkQueueComponent },
    { path: 'tasks', component: TaskListComponent },
    { path: 'events', component: EventListComponent },
    { path: 'account', loadChildren: () => import('../console/account/account.module').then(m => m.AccountModule) },
    { path: 'contact', loadChildren: () => import('../console/contact/contact.module').then(m => m.ContactModule) },
    { path: 'lead', loadChildren: () => import('../console/lead/lead.module').then(m => m.LeadModule) },
    { path: 'opportunity', loadChildren: () => import('../console/opportunity/opportunity.module').then(m => m.OpportunityModule) },
    { path: 'support', loadChildren: () => import('../console/support/support.module').then(m => m.SupportModule) },
    { path: 'setting', loadChildren: () => import('../console/setting/setting.module').then(m => m.SettingModule) },
    { path: 'leads', pathMatch: 'full', redirectTo: 'lead' },
    { path: 'opportunities', pathMatch: 'full', redirectTo: 'opportunity' },
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleRoutingModule { }
