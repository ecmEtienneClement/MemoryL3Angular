import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { NameModels } from 'src/app/core/models/NameModels';
import { EffectsModule } from '@ngrx/effects';
import {
  ConsultationsEffects,
  ConsultationsReducer,
} from './Consultation.ngrx';

@NgModule({
  imports: [
    StoreModule.forFeature(
      NameModels.consultation,
      ConsultationsReducer.getReducer
    ),
    EffectsModule.forFeature([ConsultationsEffects]),
  ],
})
export class ConsultationModule {}
