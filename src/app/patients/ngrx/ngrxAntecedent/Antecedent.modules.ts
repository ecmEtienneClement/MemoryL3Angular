import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { NameModels } from 'src/app/core/models/NameModels';
import { EffectsModule } from '@ngrx/effects';
import { AntecedentsEffects, AntecedentsReducer } from './Antecedent.ngrx';

@NgModule({
  imports: [
    StoreModule.forFeature(
      NameModels.antecedent,
      AntecedentsReducer.getReducer
    ),
    EffectsModule.forFeature([AntecedentsEffects]),
  ],
})
export class AntecedentModule {}
