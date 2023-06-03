import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesNames } from '../core/routes/routes.config';
import { ConsultationComponent } from './consultation/consultation.component';
import { HomeComponent } from './home.component';
import { OrdonnanceComponent } from './ordonnance/ordonnance.component';
import { PayementComponent } from './payement/payement.component';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: RoutesNames.mHome.homeConsultation,
    component: ConsultationComponent,
  },
  {
    path: RoutesNames.mHome.homeOrdonnance,
    component: OrdonnanceComponent,
  },
  {
    path: RoutesNames.mHome.homePayement,
    component: PayementComponent,
  },
  { path: RoutesNames.mHome.homeRendezVous, component: RendezVousComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
