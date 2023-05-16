import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesNames } from 'src/routes/routes.config';
import { ConfiCliniqueComponent } from './confi-clinique.component';
import { ConfigCliniqueAddComponent } from './config-clinique-add/config-clinique-add.component';

const routes: Routes = [
  { path: '', component: ConfiCliniqueComponent },

  {
    path: RoutesNames.mConfig.configAdd,
    component: ConfigCliniqueAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiCliniqueRoutingModule {}
