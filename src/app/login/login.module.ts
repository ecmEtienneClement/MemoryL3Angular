import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AngularMateriels } from '../core/sharedModules/materials.modules';
import { ComponentsModule } from '../core/sharedModules/componentsModule';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    AngularMateriels,
    ComponentsModule,
  ],
})
export class LoginModule {}
