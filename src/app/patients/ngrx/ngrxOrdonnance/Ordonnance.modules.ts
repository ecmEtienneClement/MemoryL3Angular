import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { NameModels } from 'src/app/core/models/NameModels';
import { EffectsModule } from '@ngrx/effects';
import { OrdonnancesEffects, OrdonnancesReducer } from './Ordonnance.ngrx';

@NgModule({
  imports: [
    StoreModule.forFeature(
      NameModels.ordonnance,
      OrdonnancesReducer.getReducer
    ),
    EffectsModule.forFeature([OrdonnancesEffects]),
  ],
})
export class OrdonnanceModule {}
