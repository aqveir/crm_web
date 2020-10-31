import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InlineSVGModule } from 'ng-inline-svg';
import { ConsoleRoutingModule } from './console-routing.module';
import { LayoutModule } from './_layout/layout.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    //CRMO Components
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,

    //CRO Console Module
    InlineSVGModule,
    ConsoleRoutingModule,

    //CRMO Modules
    LayoutModule
  ]
})
export class ConsoleModule { }
