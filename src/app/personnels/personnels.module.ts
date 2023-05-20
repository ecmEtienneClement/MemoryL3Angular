import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonnelsRoutingModule } from './personnels-routing.module';
import { PersonnelsComponent } from './personnels.component';
import { StoreModule } from '@ngrx/store';
import { NameModels } from 'src/models/NameModels';
import { EffectsModule } from '@ngrx/effects';
import { PersonnelsEffects, PersonnelsReducer } from './ngrx/Personnels.ngrx';
import { PersonnelsAddComponent } from './personnels-add/personnels-add.component';
import { PersonnelsDetailsComponent } from './personnels-details/personnels-details.component';
import { AngularMateriels } from '../sharedModules/materials.modules';
import { ConfiCliniqueModule } from '../confi-clinique/confi-clinique.module';
import { PersonnelsUpdComponent } from './personnels-upd/personnels-upd.component';
import { ComponentsModule } from '../sharedModules/componentsModule';

@NgModule({
  declarations: [
    PersonnelsComponent,
    PersonnelsAddComponent,

    PersonnelsDetailsComponent,
    PersonnelsUpdComponent,
  ],
  imports: [
    CommonModule,
    PersonnelsRoutingModule,
    StoreModule.forFeature(NameModels.personnel, PersonnelsReducer.getReducer),
    EffectsModule.forFeature([PersonnelsEffects]),
    AngularMateriels,
    ConfiCliniqueModule,
    ComponentsModule,
  ],
})
export class PersonnelsModule {}
