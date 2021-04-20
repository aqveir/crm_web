import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Plugin Modules
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

//Application Modules
import { AccountRoutingModule } from './account-routing.module';
import { LoggerModule, NotificationModule, PipeModule, TranslateModule, ValidatorModule, IntlTelInputModule } from 'ellaisys-lib';

//Application Components
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountListComponent } from './account-list/account-list.component';

@NgModule({
  declarations: [AccountDetailComponent, AccountListComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,

    //Pluin Modules
    NgbTooltipModule,

    //EllaiSys Library
    TranslateModule,
    NotificationModule,
    ValidatorModule,
    PipeModule,
    LoggerModule,
    IntlTelInputModule,

    //Application Modules
    AccountRoutingModule
  ]
})
export class AccountModule { }
