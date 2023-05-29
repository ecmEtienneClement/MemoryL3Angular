import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NameModels } from 'src/app/core/models/NameModels';
import { PatientsEffects, PatientsReducer } from './ngrx/Patients.ngrx';
import { PatientsAddComponent } from './patients-add/patients-add.component';
import { PatientsDetailsComponent } from './patients-details/patients-details.component';
import { AngularMateriels } from '../core/sharedModules/materials.modules';
import { PatientsUpdComponent } from './patients-upd/patients-upd.component';
import { ComponentsModule } from '../core/sharedModules/componentsModule';
import { DossierPatientComponent } from './dossierPatient/dossier-patient/dossier-patient.component';
import { DossierPatientAddComponent } from './dossierPatient/dossier-patient-add/dossier-patient-add.component';
import { DossierPatientUpdComponent } from './dossierPatient/dossier-patient-upd/dossier-patient-upd.component';
import { DossierPatientModule } from './ngrx/ngrxDossierPatient/DossierPatient.modules';
import { ConfiCliniqueModule } from '../confi-clinique/confi-clinique.module';
import { PersonnelsModule } from 'src/app/personnels/personnels.module';
import { DossierPatientDetailsComponent } from './dossierPatient/dossier-patient-details/dossier-patient-details.component';
import { ConsultationAddComponent } from './dossierPatient/dossiers/consultation-add/consultation-add.component';
import { AntecedentAddComponent } from './dossierPatient/dossiers/antecedent-add/antecedent-add.component';
import { OrdonnanceAddComponent } from './dossierPatient/dossiers/ordonnance-add/ordonnance-add.component';
import { RendezVousAddComponent } from './dossierPatient/dossiers/rendez-vous-add/rendez-vous-add.component';
import { PayementAddComponent } from './dossierPatient/dossiers/payement-add/payement-add.component';
import { ConsultationModule } from './ngrx/ngrxConsultation/Consultation.modules';
import { OrdonnanceModule } from './ngrx/ngrxOrdonnance/Ordonnance.modules';
import { AntecedentModule } from './ngrx/ngrxAntecedent/Antecedent.modules';
import { PayementModule } from './ngrx/ngrxPayement/Payement.modules';
import { RendezVousModule } from './ngrx/ngrxRendezVous/RendezVous.modules';
import { AntecedentUpdComponent } from './dossierPatient/dossiers/antecedent-upd/antecedent-upd.component';
import { ConsultationUpdComponent } from './dossierPatient/dossiers/consultation-upd/consultation-upd.component';
import { OrdonnanceUpdComponent } from './dossierPatient/dossiers/ordonnance-upd/ordonnance-upd.component';
import { PayementUpdComponent } from './dossierPatient/dossiers/payement-upd/payement-upd.component';
import { RendezVousUpdComponent } from './dossierPatient/dossiers/rendez-vous-upd/rendez-vous-upd.component';

@NgModule({
  declarations: [
    PatientsComponent,
    PatientsAddComponent,
    PatientsDetailsComponent,
    PatientsUpdComponent,
    DossierPatientComponent,
    DossierPatientAddComponent,
    DossierPatientUpdComponent,
    DossierPatientDetailsComponent,
    ConsultationAddComponent,
    AntecedentAddComponent,
    OrdonnanceAddComponent,
    RendezVousAddComponent,
    PayementAddComponent,
    AntecedentUpdComponent,
    ConsultationUpdComponent,
    OrdonnanceUpdComponent,
    PayementUpdComponent,
    RendezVousUpdComponent,
  ],
  imports: [
    CommonModule,
    AngularMateriels,
    PatientsRoutingModule,
    StoreModule.forFeature(NameModels.patient, PatientsReducer.getReducer),
    EffectsModule.forFeature([PatientsEffects]),
    ComponentsModule,
    DossierPatientModule,
    ConfiCliniqueModule,
    PersonnelsModule,
    ConsultationModule,
    OrdonnanceModule,
    AntecedentModule,
    PayementModule,
    RendezVousModule,
  ],
})
export class PatientsModule {}
