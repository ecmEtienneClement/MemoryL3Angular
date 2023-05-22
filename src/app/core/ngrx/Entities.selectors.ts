import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { I } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { IEntitiesState } from './Entities.state';
import { getRouter } from './Router.selectores';
import { customeRouterState } from './Router.state';

@Injectable()
export class EntitiesSelectors<T extends I> {
  constructor(private nameModels: NameModels) {}

  //
  public getStateEntities() {
    return createFeatureSelector<IEntitiesState<T>>(this.nameModels);
  }

  //
  public getEntities() {
    return createSelector(
      this.getStateEntities(),
      (state: IEntitiesState<T>) => state.entities
    );
  }

  //
  public getEntitie() {
    return createSelector(
      this.getStateEntities(),
      (state: IEntitiesState<T>) => state.entitie
    );
  }
  //
  public getEntitieById() {
    return createSelector(
      this.getStateEntities(),
      getRouter,
      (state: IEntitiesState<T>, router: customeRouterState) => {
        if (state.entities && router.params['id']) {
          return state.entities.find(
            (entitie) => entitie.id == router.params['id']
          );
        }
        return null;
      }
    );
  }
  //
  public getNotification() {
    return createSelector(
      this.getStateEntities(),
      (state: IEntitiesState<T>) => state.notification
    );
  }

  //
  public getStateApp() {
    return createSelector(
      this.getStateEntities(),
      (state: IEntitiesState<T>) => state.stateApp
    );
  }

  //
  public getError() {
    return createSelector(
      this.getStateEntities(),
      (state: IEntitiesState<T>) => state.error
    );
  }
}
