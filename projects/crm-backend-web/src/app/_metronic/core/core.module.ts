import { NgModule } from '@angular/core';

//Metronic Core
import { FirstLetterPipe } from './pipes/first-letter.pipe';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [FirstLetterPipe, SafePipe],
  imports: [],
  exports: [FirstLetterPipe, SafePipe],
})
export class CoreModule {}
