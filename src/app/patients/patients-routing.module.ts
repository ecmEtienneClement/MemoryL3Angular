import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import { DossierPatientAddComponent } from './dossierPatient/dossier-patient-add/dossier-patient-add.component';
import { DossierPatientUpdComponent } from './dossierPatient/dossier-patient-upd/dossier-patient-upd.component';
import { DossierPatientComponent } from './dossierPatient/dossier-patient/dossier-patient.component';
import { PatientsAddComponent } from './patients-add/patients-add.component';
import { PatientsDetailsComponent } from './patients-details/patients-details.component';
import { PatientsUpdComponent } from './patients-upd/patients-upd.component';
import { PatientsComponent } from './patients.component';

const routes: Routes = [
  { path: '', component: PatientsComponent },
  { path: RoutesNames.mPatient.patientsAdd, component: PatientsAddComponent },
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
