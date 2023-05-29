import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { NameModels } from 'src/app/core/models/NameModels';
import { EffectsModule } from '@ngrx/effects';
import {  RendezVoussEffects, RendezVoussReducer } from './RendezVous.ngrx';

@NgModule({
  imports: [
    StoreModule.forFeature(
      NameModels.rendezVous,
      RendezVoussReducer.getReducer
    ),
    EffectsModule.forFeature([RendezVoussEffects]),
  ],
})
export class RendezVousModule {}
