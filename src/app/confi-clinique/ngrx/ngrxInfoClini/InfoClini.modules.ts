import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { NameModels } from 'src/app/core/models/NameModels';
import { EffectsModule } from '@ngrx/effects';
import { InfoCliniquesEffects, InfoCliniquesReducer } from './InfoClini.ngrx';

@NgModule({
  imports: [
    StoreModule.forFeature(
      NameModels.infoClinique,
      InfoCliniquesReducer.getReducer
    ),
    EffectsModule.forFeature([InfoCliniquesEffects]),
  ],
})
export class InfoCliniquesModule {}
