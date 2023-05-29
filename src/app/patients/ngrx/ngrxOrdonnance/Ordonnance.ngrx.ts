import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Ordonnance } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesActions } from 'src/app/core/ngrx/Entities.actions';
import { EntitiesEffects } from 'src/app/core/ngrx/Entities.effects';
import { EntitiesReducer } from 'src/app/core/ngrx/Entities.reducer';
import { EntitiesSelectors } from 'src/app/core/ngrx/Entities.selectors';
import {
  EntitiesNameAPI,
  IEntitiesState,
} from 'src/app/core/ngrx/Entities.state';
import { OrdonnanceApiService } from './OrdonnanceApiService';

//TODO NGRX ORDONNANCE STATE
export interface IOrdonnance extends IEntitiesState<Ordonnance> {}

/*****************                                                  *********************** */

//TODO NGRX ORDONNANCE ACTIONS
@Injectable({ providedIn: 'root' })
export class OrdonnancesActions extends EntitiesActions<Ordonnance> {
  constructor() {
    super(EntitiesNameAPI.ordonnance);
  }
}

/*****************                                                  *********************** */

//TODO NGRX ORDONNANCE EFFECTS
@Injectable()
export class OrdonnancesEffects extends EntitiesEffects<Ordonnance> {
  constructor(
    action: Actions,
    ordonnanceActions: OrdonnancesActions,
    ordonnanceApiService: OrdonnanceApiService
  ) {
    super(
      action,
      ordonnanceActions,
      ordonnanceApiService,
      NameModels.ordonnance
    );
  }
}

/*****************                                                  *********************** */

//TODO NGRX ORDONNANCE SELECTORS
@Injectable({ providedIn: 'root' })
export class OrdonnancesSelectors extends EntitiesSelectors<Ordonnance> {
  constructor() {
    super(NameModels.ordonnance);
  }
}

/*****************                                                  *********************** */

//TODO NGRX ORDONNANCE REDUCER
export class OrdonnancesReducer extends EntitiesReducer<Ordonnance> {
  private static ordonnanceReducer: OrdonnancesReducer | null = null;
  //
  constructor(ordonnanceActions: OrdonnancesActions) {
    super(ordonnanceActions);
  }
  //
  public static getReducer(state: IOrdonnance, action: Action) {
    //Pattern singleton
    if (OrdonnancesReducer.ordonnanceReducer == null) {
      OrdonnancesReducer.ordonnanceReducer = new OrdonnancesReducer(
        new OrdonnancesActions()
      );
    }
    return OrdonnancesReducer.ordonnanceReducer.entitiesReducer()(
      state,
      action
    );
  }
}
