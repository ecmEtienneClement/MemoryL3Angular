import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AngularMateriels } from '../core/sharedModules/materials.modules';
import { ComponentsModule } from '../core/sharedModules/componentsModule';
import { LoginService } from './login.service';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { PersonnelsModule } from '../personnels/personnels.module';

@NgModule({
  declarations: [LoginComponent, AddAdminComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    AngularMateriels,
    ComponentsModule,
    PersonnelsModule,
    ComponentsModule,
  ],
  providers: [LoginService],
})
export class LoginModule {}
