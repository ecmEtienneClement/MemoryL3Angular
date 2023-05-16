import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { NameModels } from 'src/models/NameModels';
import { EffectsModule } from '@ngrx/effects';
import { TypeDeSallesEffects, TypeDeSallesReducer } from './TypesSalles.ngrx';

@NgModule({
  imports: [
    StoreModule.forFeature(
      NameModels.typeDeSalle,
      TypeDeSallesReducer.getReducer
    ),
    EffectsModule.forFeature([TypeDeSallesEffects]),
  ],
})
export class TypeDeSallesModule {}
