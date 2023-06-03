import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilComponent } from './profil.component';
import { AngularMateriels } from '../core/sharedModules/materials.modules';
import { ComponentsModule } from '../core/sharedModules/componentsModule';

@NgModule({
  declarations: [ProfilComponent],
  imports: [
    CommonModule,
    ProfilRoutingModule,
    AngularMateriels,
    ComponentsModule,
  ],
})
export class ProfilModule {}
