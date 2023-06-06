import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMateriels } from './sharedModules/materials.modules';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EntitiesDataAPI } from './serviceEntities/EntitiesDataAPI';
import { EntitiesActions } from './ngrx/Entities.actions';
import { EntitiesEffects } from './ngrx/Entities.effects';
import { EntitiesSelectors } from './ngrx/Entities.selectors';
import { AppReducer } from './ngrx/Entities.state';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomeRouterSerializen } from './ngrx/Router.state';
import { ComponentsModule } from './sharedModules/componentsModule';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({}),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomeRouterSerializen,
    }),
    AngularMateriels,
    ComponentsModule,
  
  ],
  exports: [AngularMateriels, ComponentsModule],
  providers: [
    EntitiesDataAPI,
    EntitiesActions,
    EntitiesEffects,
    EntitiesSelectors,
  ],
})
export class CoreModule {}
