import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Payement } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesActions } from 'src/app/core/ngrx/Entities.actions';
import { EntitiesEffects } from 'src/app/core/ngrx/Entities.effects';
import { EntitiesReducer } from 'src/app/core/ngrx/Entities.reducer';
import { EntitiesSelectors } from 'src/app/core/ngrx/Entities.selectors';
import {
  EntitiesNameAPI,
  IEntitiesState,
} from 'src/app/core/ngrx/Entities.state';
import { PayementApiService } from './PayementApiService';

//TODO NGRX PAYEMENT STATE
export interface IPayement extends IEntitiesState<Payement> {}

/*****************                                                  *********************** */

//TODO NGRX PAYEMENT ACTIONS
@Injectable({ providedIn: 'root' })
export class PayementsActions extends EntitiesActions<Payement> {
  constructor() {
    super(EntitiesNameAPI.payement);
  }
}

/*****************                                                  *********************** */

//TODO NGRX PAYEMENT EFFECTS
@Injectable()
export class PayementsEffects extends EntitiesEffects<Payement> {
  constructor(
    action: Actions,
    payementActions: PayementsActions,
    payementApiService: PayementApiService
  ) {
    super(action, payementActions, payementApiService, NameModels.payement);
  }
}

/*****************                                                  *********************** */

//TODO NGRX PAYEMENT SELECTORS
@Injectable({ providedIn: 'root' })
export class PayementsSelectors extends EntitiesSelectors<Payement> {
  constructor() {
    super(NameModels.payement);
  }
}

/*****************                                                  *********************** */

//TODO NGRX PAYEMENT REDUCER
export class PayementsReducer extends EntitiesReducer<Payement> {
  private static payementReducer: PayementsReducer | null = null;
  //
  constructor(payementActions: PayementsActions) {
    super(payementActions);
  }
  //
  public static getReducer(state: IPayement, action: Action) {
    //Pattern singleton
    if (PayementsReducer.payementReducer == null) {
      PayementsReducer.payementReducer = new PayementsReducer(
        new PayementsActions()
      );
    }
    return PayementsReducer.payementReducer.entitiesReducer()(state, action);
  }
}
