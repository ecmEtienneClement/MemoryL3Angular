import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesNames } from 'src/routes/routes.config';

const routes: Routes = [
  {
    path: RoutesNames.mPersonnel.personnels,
    loadChildren: () =>
      import('./personnels/personnels.module').then((m) => m.PersonnelsModule),
  },
  {
    path: RoutesNames.mPatient.patients,
    loadChildren: () =>
      import('./patients/patients.module').then((m) => m.PatientsModule),
  },
  {
    path: RoutesNames.mConfig.config,
    loadChildren: () =>
      import('./confi-clinique/confi-clinique.module').then(
        (m) => m.ConfiCliniqueModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
