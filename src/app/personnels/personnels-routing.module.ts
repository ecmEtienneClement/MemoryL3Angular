import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesNames } from 'src/routes/routes.config';
import { PersonnelsAddComponent } from './personnels-add/personnels-add.component';
import { PersonnelsDetailsComponent } from './personnels-details/personnels-details.component';
import { PersonnelsUpdComponent } from './personnels-upd/personnels-upd.component';
import { PersonnelsComponent } from './personnels.component';

const routes: Routes = [
  { path: '', component: PersonnelsComponent },
  {
    path: RoutesNames.mPersonnel.personnelsAdd,
    component: PersonnelsAddComponent,
  },
  {
    path: `${RoutesNames.mPersonnel.personnelsDetails}/:id`,
    component: PersonnelsDetailsComponent,
  },
  {
    path: `${RoutesNames.mPersonnel.personnelsUpd}/:id`,
    component: PersonnelsUpdComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonnelsRoutingModule {}
