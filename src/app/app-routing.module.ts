import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesNames } from 'src/app/core/routes/routes.config';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./patients/patients.module').then((m) => m.PatientsModule),
  },

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
  {
    path: RoutesNames.mHome.home,
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: RoutesNames.mProfil.profil,
    loadChildren: () =>
      import('./profil/profil.module').then((m) => m.ProfilModule),
  },
  {
    path: `${RoutesNames.mLogin.login}`,
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
