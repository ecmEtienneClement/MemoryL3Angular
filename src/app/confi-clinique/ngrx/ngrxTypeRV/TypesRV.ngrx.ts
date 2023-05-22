import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TypeRendezVous } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesActions } from 'src/app/core/ngrx/Entities.actions';
import { EntitiesEffects } from 'src/app/core/ngrx/Entities.effects';
import { EntitiesReducer } from 'src/app/core/ngrx/Entities.reducer';
import { EntitiesSelectors } from 'src/app/core/ngrx/Entities.selectors';
import { EntitiesNameAPI, IEntitiesState } from 'src/app/core/ngrx/Entities.state';
import { TypeRVApiService } from './TypesRVApiService';

//TODO NGRX TYPERENDEZVOUS STATE
export interface ITypeRendezVous extends IEntitiesState<TypeRendezVous> {}

/*****************                                                  *********************** */

//TODO NGRX TYPERENDEZVOUS ACTIONS
@Injectable({ providedIn: 'root' })
export class TypeRendezVousActions extends EntitiesActions<TypeRendezVous> {
  constructor() {
    super(EntitiesNameAPI.typeDeRV);
  }
}

/*****************                                                  *********************** */

//TODO NGRX TYPERENDEZVOUS EFFECTS
@Injectable()
export class TypeRendezVousEffects extends EntitiesEffects<TypeRendezVous> {
  constructor(
    action: Actions,
    typervActions: TypeRendezVousActions,
    typervApiData: TypeRVApiService
  ) {
    super(action, typervActions, typervApiData, NameModels.typeRendezVous);
  }
}

/*****************                                                  *********************** */

//TODO NGRX TYPERENDEZVOUS SELECTORS
@Injectable({ providedIn: 'root' })
export class TypeRendezVousSelectors extends EntitiesSelectors<TypeRendezVous> {
  constructor() {
    super(NameModels.typeRendezVous);
  }
}

/*****************                                                  *********************** */

//TODO NGRX TYPERENDEZVOUS REDUCER
export class TypeRendezVousReducer extends EntitiesReducer<TypeRendezVous> {
  private static typervReducer: TypeRendezVousReducer | null = null;
  //
  constructor(typervActions: TypeRendezVousActions) {
    super(typervActions);
  }

  //
  public static getReducer(state: ITypeRendezVous, action: Action) {
    //Pattern singleton
    if (TypeRendezVousReducer.typervReducer == null) {
      TypeRendezVousReducer.typervReducer = new TypeRendezVousReducer(
        new TypeRendezVousActions()
      );
    }
    return TypeRendezVousReducer.typervReducer.entitiesReducer()(state, action);
  }
}
