import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { NameModels } from 'src/app/core/models/NameModels';
import { EffectsModule } from '@ngrx/effects';
import { PostesEffects, PostesReducer } from './Postes.ngrx';

@NgModule({
  imports: [
    StoreModule.forFeature(NameModels.poste, PostesReducer.getReducer),
    EffectsModule.forFeature([PostesEffects]),
  ],
})
export class PostsModule {}
