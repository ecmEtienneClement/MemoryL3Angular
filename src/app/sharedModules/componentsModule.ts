import { CommonModule } from '@angular/common';
import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { LoadingCmpComponent } from './components/loading-cmp/loading-cmp.component';
import { AngularMateriels } from './materials.modules';
@NgModule({
  declarations: [LoadingCmpComponent],
  imports: [CommonModule, AngularMateriels],
  exports: [LoadingCmpComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ComponentsModule {}
