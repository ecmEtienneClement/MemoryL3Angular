import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Tache } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesActions } from 'src/app/core/ngrx/Entities.actions';
import { EntitiesEffects } from 'src/app/core/ngrx/Entities.effects';
import { EntitiesReducer } from 'src/app/core/ngrx/Entities.reducer';
import { EntitiesSelectors } from 'src/app/core/ngrx/Entities.selectors';
import {
  EntitiesNameAPI,
  IEntitiesState,
} from 'src/app/core/ngrx/Entities.state';
import { TacheApiService } from './TacheApiService';

//TODO NGRX TACHE STATE
export interface ITache extends IEntitiesState<Tache> {}

/*****************                                                  *********************** */

//TODO NGRX TACHE ACTIONS
@Injectable({ providedIn: 'root' })
export class TachesActions extends EntitiesActions<Tache> {
  constructor() {
    super(EntitiesNameAPI.tache);
  }
}

/*****************                                                  *********************** */

//TODO NGRX TACHE EFFECTS
@Injectable()
export class TachesEffects extends EntitiesEffects<Tache> {
  constructor(
    action: Actions,
    tacheActions: TachesActions,
    tacheApiService: TacheApiService
  ) {
    super(action, tacheActions, tacheApiService, NameModels.tache);
  }
}

/*****************                                                  *********************** */

//TODO NGRX TACHE SELECTORS
@Injectable({ providedIn: 'root' })
export class TachesSelectors extends EntitiesSelectors<Tache> {
  constructor() {
    super(NameModels.tache);
  }
}

/*****************                                                  *********************** */

//TODO NGRX TACHE REDUCER
export class TachesReducer extends EntitiesReducer<Tache> {
  private static tacheReducer: TachesReducer | null = null;
  //
  constructor(tacheActions: TachesActions) {
    super(tacheActions);
  }
  //
  public static getReducer(state: ITache, action: Action) {
    //Pattern singleton
    if (TachesReducer.tacheReducer == null) {
      TachesReducer.tacheReducer = new TachesReducer(new TachesActions());
    }
    return TachesReducer.tacheReducer.entitiesReducer()(state, action);
  }
}
