import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiCliniqueRoutingModule } from './confi-clinique-routing.module';
import { ConfiCliniqueComponent } from './confi-clinique.component';
import { PostsModule } from './ngrx/ngrxPoste/Postes.modules';
import { TypeDeSallesModule } from './ngrx/ngrxTypeSalle/TypesSalles.modules';
import { SallesModule } from './ngrx/ngrxSalle/Salles.modules';
import { TypeRvModule } from './ngrx/ngrxTypeRV/TypesRV.modules';
import { AngularMateriels } from '../sharedModules/materials.modules';
import { ConfigCliniqueAddComponent } from './config-clinique-add/config-clinique-add.component';
import { InfoCliniquesModule } from './ngrx/ngrxInfoClini/InfoClini.modules';

@NgModule({
  declarations: [ConfiCliniqueComponent, ConfigCliniqueAddComponent],
  imports: [
    CommonModule,
    ConfiCliniqueRoutingModule,
    PostsModule,
    TypeRvModule,
    SallesModule,
    TypeDeSallesModule,
    InfoCliniquesModule,
    AngularMateriels,
  ],
})
export class ConfiCliniqueModule {}
