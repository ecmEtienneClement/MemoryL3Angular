import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesNames } from 'src/routes/routes.config';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
