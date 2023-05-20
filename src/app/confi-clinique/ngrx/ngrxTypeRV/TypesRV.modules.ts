import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { NameModels } from 'src/app/core/models/NameModels';
import { EffectsModule } from '@ngrx/effects';
import {  TypeRendezVousReducer, TypeRendezVousEffects } from './TypesRV.ngrx';

@NgModule({
  imports: [
    StoreModule.forFeature(NameModels.typeRendezVous, TypeRendezVousReducer.getReducer),
    EffectsModule.forFeature([TypeRendezVousEffects]),
  ],
})
export class TypeRvModule {}
