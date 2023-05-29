import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { NameModels } from 'src/app/core/models/NameModels';
import { EffectsModule } from '@ngrx/effects';
import { PayementsEffects, PayementsReducer } from './Payement.ngrx';

@NgModule({
  imports: [
    StoreModule.forFeature(NameModels.payement, PayementsReducer.getReducer),
    EffectsModule.forFeature([PayementsEffects]),
  ],
})
export class PayementModule {}
