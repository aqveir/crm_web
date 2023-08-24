import { NgModule, ModuleWithProviders } from '@angular/core';

//Application Modules
import { NgxCommonLibModule } from 'common-lib';

//Library Components
import { CrmLibComponent } from './crm-lib.component';
import { CrmLibService } from './crm-lib.service';


@NgModule({
  declarations: [ CrmLibComponent ],
  imports: [
    //Commons Library
    NgxCommonLibModule,
  ],
  exports: [ CrmLibComponent ]
})
export class CrmLibModule { 
  static forRoot(_environment: any): ModuleWithProviders<CrmLibModule> {
    console.log('crm-lib.environment', _environment);
    
    return {
      ngModule: CrmLibModule,
      providers: [ 
        CrmLibService, 
        { provide: 'environment', useValue: _environment } 
      ]
    };
  } //Method ends

} //Class ends

