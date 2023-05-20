import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EntitiesDataAPI } from 'src/serviceEntities/EntitiesDataAPI';
import { EntitiesActions } from 'src/ngrx/Entities.actions';
import { EntitiesEffects } from 'src/ngrx/Entities.effects';
import { EntitiesSelectors } from 'src/ngrx/Entities.selectors';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppReducer } from 'src/ngrx/Entities.state';
import { CustomeRouterSerializen } from 'src/ngrx/Router.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMateriels } from './sharedModules/materials.modules';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({}),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomeRouterSerializen,
    }),
    AngularMateriels,
  ],
  providers: [
    EntitiesDataAPI,
    EntitiesActions,
    EntitiesEffects,
    EntitiesSelectors,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
