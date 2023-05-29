import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Antecedent } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesActions } from 'src/app/core/ngrx/Entities.actions';
import { EntitiesEffects } from 'src/app/core/ngrx/Entities.effects';
import { EntitiesReducer } from 'src/app/core/ngrx/Entities.reducer';
import { EntitiesSelectors } from 'src/app/core/ngrx/Entities.selectors';
import {
  EntitiesNameAPI,
  IEntitiesState,
} from 'src/app/core/ngrx/Entities.state';
import { AntecedentApiService } from './AntecedentApiService';

//TODO NGRX ANTECEDENT STATE
export interface IAntecedent extends IEntitiesState<Antecedent> {}

/*****************                                                  *********************** */

//TODO NGRX ANTECEDENT ACTIONS
@Injectable({ providedIn: 'root' })
export class AntecedentsActions extends EntitiesActions<Antecedent> {
  constructor() {
    super(EntitiesNameAPI.antecedent);
  }
}

/*****************                                                  *********************** */

//TODO NGRX ANTECEDENT EFFECTS
@Injectable()
export class AntecedentsEffects extends EntitiesEffects<Antecedent> {
  constructor(
    action: Actions,
    antecedentActions: AntecedentsActions,
    antecedentApiService: AntecedentApiService
  ) {
    super(
      action,
      antecedentActions,
      antecedentApiService,
      NameModels.antecedent
    );
  }
}

/*****************                                                  *********************** */

//TODO NGRX ANTECEDENT SELECTORS
@Injectable({ providedIn: 'root' })
export class AntecedentsSelectors extends EntitiesSelectors<Antecedent> {
  constructor() {
    super(NameModels.antecedent);
  }
}

/*****************                                                  *********************** */

//TODO NGRX ANTECEDENT REDUCER
export class AntecedentsReducer extends EntitiesReducer<Antecedent> {
  private static antecedentReducer: AntecedentsReducer | null = null;
  //
  constructor(antecedentActions: AntecedentsActions) {
    super(antecedentActions);
  }
  //
  public static getReducer(state: IAntecedent, action: Action) {
    //Pattern singleton
    if (AntecedentsReducer.antecedentReducer == null) {
      AntecedentsReducer.antecedentReducer = new AntecedentsReducer(
        new AntecedentsActions()
      );
    }
    return AntecedentsReducer.antecedentReducer.entitiesReducer()(
      state,
      action
    );
  }
}
