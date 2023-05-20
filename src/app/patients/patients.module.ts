import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NameModels } from 'src/models/NameModels';
import { PatientsEffects, PatientsReducer } from './ngrx/Patients.ngrx';
import { PatientsAddComponent } from './patients-add/patients-add.component';
import { PatientsDetailsComponent } from './patients-details/patients-details.component';
import { AngularMateriels } from '../sharedModules/materials.modules';
import { PatientsUpdComponent } from './patients-upd/patients-upd.component';
import { ComponentsModule } from '../sharedModules/componentsModule';

@NgModule({
  declarations: [
    PatientsComponent,
    PatientsAddComponent,
    PatientsDetailsComponent,
    PatientsUpdComponent,
  ],
  imports: [
    CommonModule,
    AngularMateriels,
    PatientsRoutingModule,
    StoreModule.forFeature(NameModels.patient, PatientsReducer.getReducer),
    EffectsModule.forFeature([PatientsEffects]),
    ComponentsModule,
  ],
})
export class PatientsModule {}
