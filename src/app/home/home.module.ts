import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AngularMateriels } from '../core/sharedModules/materials.modules';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { OrdonnanceComponent } from './ordonnance/ordonnance.component';
import { PayementComponent } from './payement/payement.component';
import { ConsultationModule } from '../patients/ngrx/ngrxConsultation/Consultation.modules';
import { OrdonnanceModule } from '../patients/ngrx/ngrxOrdonnance/Ordonnance.modules';
import { PayementModule } from '../patients/ngrx/ngrxPayement/Payement.modules';
import { RendezVousModule } from '../patients/ngrx/ngrxRendezVous/RendezVous.modules';
import { ComponentsModule } from '../core/sharedModules/componentsModule';

@NgModule({
  declarations: [
    HomeComponent,
    RendezVousComponent,
    ConsultationComponent,
    OrdonnanceComponent,
    PayementComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularMateriels,
    ComponentsModule,
    ConsultationModule,
    OrdonnanceModule,
    PayementModule,
    RendezVousModule,
  ],
})
export class HomeModule {}
