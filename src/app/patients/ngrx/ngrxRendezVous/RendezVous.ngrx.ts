import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { RendezVous } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesActions } from 'src/app/core/ngrx/Entities.actions';
import { EntitiesEffects } from 'src/app/core/ngrx/Entities.effects';
import { EntitiesReducer } from 'src/app/core/ngrx/Entities.reducer';
import { EntitiesSelectors } from 'src/app/core/ngrx/Entities.selectors';
import {
  EntitiesNameAPI,
  IEntitiesState,
} from 'src/app/core/ngrx/Entities.state';
import { RendezVousApiService } from './RendezVousApiService';

//TODO NGRX RENDEZ-VOUS STATE
export interface IRendezVous extends IEntitiesState<RendezVous> {}

/*****************                                                  *********************** */

//TODO NGRX RENDEZ-VOUS ACTIONS
@Injectable({ providedIn: 'root' })
export class RendezVoussActions extends EntitiesActions<RendezVous> {
  constructor() {
    super(EntitiesNameAPI.rendezVous);
  }
}

/*****************                                                  *********************** */

//TODO NGRX RENDEZ-VOUS EFFECTS
@Injectable()
export class RendezVoussEffects extends EntitiesEffects<RendezVous> {
  constructor(
    action: Actions,
    rendezVousActions: RendezVoussActions,
    rendezVousApiService: RendezVousApiService
  ) {
    super(
      action,
      rendezVousActions,
      rendezVousApiService,
      NameModels.rendezVous
    );
  }
}

/*****************                                                  *********************** */

//TODO NGRX RENDEZ-VOUS SELECTORS
@Injectable({ providedIn: 'root' })
export class RendezVoussSelectors extends EntitiesSelectors<RendezVous> {
  constructor() {
    super(NameModels.rendezVous);
  }
}

/*****************                                                  *********************** */

//TODO NGRX RENDEZ-VOUS REDUCER
export class RendezVoussReducer extends EntitiesReducer<RendezVous> {
  private static rendezVousReducer: RendezVoussReducer | null = null;
  //
  constructor(rendezVousActions: RendezVoussActions) {
    super(rendezVousActions);
  }
  //
  public static getReducer(state: IRendezVous, action: Action) {
    //Pattern singleton
    if (RendezVoussReducer.rendezVousReducer == null) {
      RendezVoussReducer.rendezVousReducer = new RendezVoussReducer(
        new RendezVoussActions()
      );
    }
    return RendezVoussReducer.rendezVousReducer.entitiesReducer()(
      state,
      action
    );
  }
}
