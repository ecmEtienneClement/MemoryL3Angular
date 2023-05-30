import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import { DossierPatientAddComponent } from './dossierPatient/dossier-patient-add/dossier-patient-add.component';
import { DossierPatientDetailsComponent } from './dossierPatient/dossier-patient-details/dossier-patient-details.component';
import { DossierPatientUpdComponent } from './dossierPatient/dossier-patient-upd/dossier-patient-upd.component';
import { DossierPatientComponent } from './dossierPatient/dossier-patient/dossier-patient.component';
import { PatientsAddComponent } from './patients-add/patients-add.component';
import { PatientsDetailsComponent } from './patients-details/patients-details.component';
import { PatientsUpdComponent } from './patients-upd/patients-upd.component';
import { ConsultationAddComponent } from './dossierPatient/dossiers/consultation-add/consultation-add.component';
import { OrdonnanceAddComponent } from './dossierPatient/dossiers/ordonnance-add/ordonnance-add.component';
import { RendezVousAddComponent } from './dossierPatient/dossiers/rendez-vous-add/rendez-vous-add.component';
import { PayementAddComponent } from './dossierPatient/dossiers/payement-add/payement-add.component';
import { AntecedentAddComponent } from './dossierPatient/dossiers/antecedent-add/antecedent-add.component';
import { PatientsComponent } from './patients.component';
import { ConsultationUpdComponent } from './dossierPatient/dossiers/consultation-upd/consultation-upd.component';
import { OrdonnanceUpdComponent } from './dossierPatient/dossiers/ordonnance-upd/ordonnance-upd.component';
import { RendezVousUpdComponent } from './dossierPatient/dossiers/rendez-vous-upd/rendez-vous-upd.component';
import { AntecedentUpdComponent } from './dossierPatient/dossiers/antecedent-upd/antecedent-upd.component';
import { PayementUpdComponent } from './dossierPatient/dossiers/payement-upd/payement-upd.component';
import { TachesComponent } from './taches/taches.component';
import { TachesAddComponent } from './taches-add/taches-add.component';
import { TachesDetailsComponent } from './taches-details/taches-details.component';

const routes: Routes = [
  { path: '', component: PatientsComponent },
  { path: RoutesNames.mPatient.patientsAdd, component: PatientsAddComponent },
  { path: RoutesNames.mPatient.patientsTaches, component: TachesComponent },
  {
    path: RoutesNames.mPatient.patientsTachesAdd,
    component: TachesAddComponent,
  },
  {
    path: `${RoutesNames.mPatient.patientsTachesDetails}/:id`,
    component: TachesDetailsComponent,
  },
  {
    path: `${RoutesNames.mPatient.patientsUpd}/:id`,
    component: PatientsUpdComponent,
  },
  {
    path: `${RoutesNames.mPatient.patientsDetails}/:id`,
    component: PatientsDetailsComponent,
  },
  {
    path: `${RoutesNames.mPatient.patientsDossier}/:id`,
    component: DossierPatientComponent,
  },
  {
    path: `${RoutesNames.mPatient.patientsDossierAdd}`,
    component: DossierPatientAddComponent,
  },
  {
    path: `${RoutesNames.mPatient.patientsDossierUpd}/:id`,
    component: DossierPatientUpdComponent,
  },
  {
    path: `${RoutesNames.mPatient.patientsDossierDetails}/:id`,
    component: DossierPatientDetailsComponent,
  },
  {
    path: `${RoutesNames.mPatient.patientsConsultationAdd}`,
    component: ConsultationAddComponent,
  },
  {
    path: `${RoutesNames.mPatient.patientsConsultationUpd}/:id/:idDossier`,
    component: ConsultationUpdComponent,
  },
  {
    path: `${RoutesNames.mPatient.patientsOrdonnanceAdd}`,
    component: OrdonnanceAddComponent,
  },
  {
    path: `${RoutesNames.mPatient.patientsOrdonnanceUpd}/:id/:idDossier`,
    component: OrdonnanceUpdComponent,
  },
  {
    path: `${RoutesNames.mPatient.patientsRendezVousAdd}`,
    component: RendezVousAddComponent,
  },
  {
    path: `${RoutesNames.mPatient.patientsRendezVousUpd}/:id/:idDossier`,
    component: RendezVousUpdComponent,
  },
  {
    path: `${RoutesNames.mPatient.patientsPayementAdd}`,
    component: PayementAddComponent,
  },
  {
    path: `${RoutesNames.mPatient.patientsPayementUpd}/:id/:idDossier`,
    component: PayementUpdComponent,
  },
  {
    path: `${RoutesNames.mPatient.patientsAntecedentAdd}`,
    component: AntecedentAddComponent,
  },
  {
    path: `${RoutesNames.mPatient.patientsAntecedentUpd}/:id/:idDossier`,
    component: AntecedentUpdComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
