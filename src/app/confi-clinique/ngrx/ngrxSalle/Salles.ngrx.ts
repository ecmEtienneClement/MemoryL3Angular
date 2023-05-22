import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Salle } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesActions } from 'src/app/core/ngrx/Entities.actions';
import { EntitiesEffects } from 'src/app/core/ngrx/Entities.effects';
import { EntitiesReducer } from 'src/app/core/ngrx/Entities.reducer';
import { EntitiesSelectors } from 'src/app/core/ngrx/Entities.selectors';
import { EntitiesNameAPI, IEntitiesState } from 'src/app/core/ngrx/Entities.state';
import { SalleApiService } from './SallesApiService';

//TODO NGRX SALLES STATE
export interface ISalle extends IEntitiesState<Salle> {}

/*****************                                                  *********************** */

//TODO NGRX SALLES ACTIONS
@Injectable({ providedIn: 'root' })
export class SallesActions extends EntitiesActions<Salle> {
  constructor() {
    super(EntitiesNameAPI.salle);
  }
}

/*****************                                                  *********************** */

//TODO NGRX SALLES EFFECTS
@Injectable()
export class SallesEffects extends EntitiesEffects<Salle> {
  constructor(
    action: Actions,
    salleActions: SallesActions,
    salleApiData: SalleApiService
  ) {
    super(action, salleActions, salleApiData, NameModels.salle);
  }
}

/*****************                                                  *********************** */

//TODO NGRX SALLES SELECTORS
@Injectable({ providedIn: 'root' })
export class SallesSelectors extends EntitiesSelectors<Salle> {
  constructor() {
    super(NameModels.salle);
  }
}

/*****************                                                  *********************** */

//TODO NGRX SALLES REDUCER
export class SallesReducer extends EntitiesReducer<Salle> {
  private static salleReducer: SallesReducer | null = null;
  //
  constructor(salleActions: SallesActions) {
    super(salleActions);
  }

  //
  public static getReducer(state: ISalle, action: Action) {
    //Pattern singleton
    if (SallesReducer.salleReducer == null) {
      SallesReducer.salleReducer = new SallesReducer(new SallesActions());
    }
    return SallesReducer.salleReducer.entitiesReducer()(state, action);
  }
}
