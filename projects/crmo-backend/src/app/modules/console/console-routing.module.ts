import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './_layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkQueueComponent } from './work-queue/work-queue.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { EventListComponent } from './event-list/event-list.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'queue', component: WorkQueueComponent },
    { path: 'contacts', component: ContactListComponent },
    { path: 'tasks', component: TaskListComponent },
    { path: 'events', component: EventListComponent },
    { path: 'setting', loadChildren: () => import('../console/setting/setting.module').then(m => m.SettingModule) },
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleRoutingModule { }
