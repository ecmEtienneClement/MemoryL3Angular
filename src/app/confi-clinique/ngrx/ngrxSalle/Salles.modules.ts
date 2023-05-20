import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { NameModels } from 'src/app/core/models/NameModels';
import { EffectsModule } from '@ngrx/effects';
import { SallesEffects, SallesReducer } from './Salles.ngrx';

@NgModule({
  imports: [
    StoreModule.forFeature(NameModels.salle, SallesReducer.getReducer),
    EffectsModule.forFeature([SallesEffects]),
  ],
})
export class SallesModule {}
