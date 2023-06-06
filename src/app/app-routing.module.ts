import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import auth from './core/auth/auth';

const routes: Routes = [
  {
    path: '',
    canActivate: [auth],
    loadChildren: () =>
      import('./patients/patients.module').then((m) => m.PatientsModule),
  },

  {
    path: RoutesNames.mPersonnel.personnels,
    canActivate: [auth],
    loadChildren: () =>
      import('./personnels/personnels.module').then((m) => m.PersonnelsModule),
  },
  {
    path: RoutesNames.mPatient.patients,
    canActivate: [auth],
    loadChildren: () =>
      import('./patients/patients.module').then((m) => m.PatientsModule),
  },
  {
    path: RoutesNames.mConfig.config,
    canActivate: [auth],
    loadChildren: () =>
      import('./confi-clinique/confi-clinique.module').then(
        (m) => m.ConfiCliniqueModule
      ),
  },
  {
    path: RoutesNames.mHome.home,
    canActivate: [auth],
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: RoutesNames.mProfil.profil,
    canActivate: [auth],
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
