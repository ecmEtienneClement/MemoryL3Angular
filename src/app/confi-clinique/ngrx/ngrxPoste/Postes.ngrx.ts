import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Poste } from 'src/models/Models';
import { NameModels } from 'src/models/NameModels';
import { EntitiesActions } from 'src/ngrx/Entities.actions';
import { EntitiesEffects } from 'src/ngrx/Entities.effects';
import { EntitiesReducer } from 'src/ngrx/Entities.reducer';
import { EntitiesSelectors } from 'src/ngrx/Entities.selectors';
import { EntitiesNameAPI, IEntitiesState } from 'src/ngrx/Entities.state';
import { PosteApiService } from './PosteApiService';

//TODO NGRX POSTES STATE
export interface IPoste extends IEntitiesState<Poste> {}

/*****************                                                  *********************** */

//TODO NGRX POSTES ACTIONS
@Injectable({ providedIn: 'root' })
export class PostesActions extends EntitiesActions<Poste> {
  constructor() {
    super(EntitiesNameAPI.poste);
  }
}

/*****************                                                  *********************** */

//TODO NGRX POSTES EFFECTS
@Injectable()
export class PostesEffects extends EntitiesEffects<Poste> {
  constructor(
    action: Actions,
    posteActions: PostesActions,
    posteApiData: PosteApiService
  ) {
    super(action, posteActions, posteApiData, NameModels.poste);
  }
}

/*****************                                                  *********************** */

//TODO NGRX POSTES SELECTORS
@Injectable({ providedIn: 'root' })
export class PostesSelectors extends EntitiesSelectors<Poste> {
  constructor() {
    super(NameModels.poste);
  }
}

/*****************                                                  *********************** */

//TODO NGRX POSTES REDUCER
export class PostesReducer extends EntitiesReducer<Poste> {
  private static posteReducer: PostesReducer | null = null;
  //
  constructor(posteActions: PostesActions) {
    super(posteActions);
  }

  //
  public static getReducer(state: IPoste, action: Action) {
    //Pattern singleton
    if (PostesReducer.posteReducer == null) {
      PostesReducer.posteReducer = new PostesReducer(new PostesActions());
    }
    return PostesReducer.posteReducer.entitiesReducer()(state, action);
  }
}
