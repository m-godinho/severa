import { NgModule } from '@angular/core';
import { EnumToArrayPipe } from './EnumToArray.pipe';

@NgModule({
  imports: [],
  declarations: [EnumToArrayPipe],
  exports: [EnumToArrayPipe]
})
export class PipeModule {
  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [EnumToArrayPipe]
    };
  }
}
