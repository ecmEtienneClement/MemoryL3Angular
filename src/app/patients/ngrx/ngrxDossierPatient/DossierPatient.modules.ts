import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { NameModels } from 'src/app/core/models/NameModels';
import { EffectsModule } from '@ngrx/effects';
import {
  DossierPatientsEffects,
  DossierPatientsReducer,
} from './DossierPatient.ngrx';

@NgModule({
  imports: [
    StoreModule.forFeature(
      NameModels.dossierPatient,
      DossierPatientsReducer.getReducer
    ),
    EffectsModule.forFeature([DossierPatientsEffects]),
  ],
})
export class DossierPatientModule {}
