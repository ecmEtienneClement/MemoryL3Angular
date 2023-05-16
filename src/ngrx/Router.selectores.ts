import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { customeRouterState } from './Router.state';

//
const getRouterState =
  createFeatureSelector<RouterReducerState<customeRouterState>>(
    'routerReducer'
  );
//
export const getRouter = createSelector(
  getRouterState,
  (router) => router.state
);
