import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListFilterPipe} from './list-filter.pipe';

@NgModule({
  declarations: [
    ListFilterPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListFilterPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PipesModule {
}
