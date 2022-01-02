import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Application Components
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactNewComponent } from './contact-new/contact-new.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'new', component: ContactNewComponent },
  { path: ':hash', component: ContactDetailComponent },
  { path: '', pathMatch: 'full', redirectTo: 'new' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
