import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListFilterPipe} from './list-filter.pipe';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    ListFilterPipe,
    SafePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListFilterPipe,
    SafePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PipesModule {
}
