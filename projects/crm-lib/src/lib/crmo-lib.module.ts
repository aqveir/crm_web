import { NgModule, ModuleWithProviders } from '@angular/core';

//Application Modules
import { EllaisysLibModule } from 'common-lib';

//Library Components
import { CrmoLibComponent } from './crmo-lib.component';
import { CrmoLibService } from './crmo-lib.service';


@NgModule({
  declarations: [CrmoLibComponent],
  imports: [
    //EllaiSys Library
    EllaisysLibModule,
  ],
  exports: [CrmoLibComponent]
})
export class CrmoLibModule { 
  static forRoot(_environment: any): ModuleWithProviders<CrmoLibModule> {
    console.log('crmo-lib.environment', _environment);
    
    return {
      ngModule: CrmoLibModule,
      providers: [ 
        CrmoLibService, 
        { provide: 'environment', useValue: _environment } 
      ]
    };
  } //Method ends

} //Class ends
