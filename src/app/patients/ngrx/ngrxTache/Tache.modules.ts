import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { NameModels } from 'src/app/core/models/NameModels';
import { EffectsModule } from '@ngrx/effects';
import { TachesEffects, TachesReducer } from './Tache.ngrx';

@NgModule({
  imports: [
    StoreModule.forFeature(NameModels.tache, TachesReducer.getReducer),
    EffectsModule.forFeature([TachesEffects]),
  ],
})
export class TacheModule {}
