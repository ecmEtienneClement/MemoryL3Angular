import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TypeDeSalle } from 'src/models/Models';
import { NameModels } from 'src/models/NameModels';
import { EntitiesActions } from 'src/ngrx/Entities.actions';
import { EntitiesEffects } from 'src/ngrx/Entities.effects';
import { EntitiesReducer } from 'src/ngrx/Entities.reducer';
import { EntitiesSelectors } from 'src/ngrx/Entities.selectors';
import { EntitiesNameAPI, IEntitiesState } from 'src/ngrx/Entities.state';
import { TypesDeSalleApiService } from './TypesSallesApiService';

//TODO NGRX TYPEDESALLE STATE
export interface ITypeDeSalle extends IEntitiesState<TypeDeSalle> {}

/*****************                                                  *********************** */

//TODO NGRX TYPEDESALLE ACTIONS
@Injectable({ providedIn: 'root' })
export class TypeDeSallesActions extends EntitiesActions<TypeDeSalle> {
  constructor() {
    super(EntitiesNameAPI.typeDeSalle);
  }
}

/*****************                                                  *********************** */

//TODO NGRX TYPEDESALLE EFFECTS
@Injectable()
export class TypeDeSallesEffects extends EntitiesEffects<TypeDeSalle> {
  constructor(
    action: Actions,
    typeDeSalleActions: TypeDeSallesActions,
    typeDeSalleApiData: TypesDeSalleApiService
  ) {
    super(
      action,
      typeDeSalleActions,
      typeDeSalleApiData,
      NameModels.typeDeSalle
    );
  }
}

/*****************                                                  *********************** */

//TODO NGRX TYPEDESALLE SELECTORS
@Injectable({ providedIn: 'root' })
export class TypeDeSallesSelectors extends EntitiesSelectors<TypeDeSalle> {
  constructor() {
    super(NameModels.typeDeSalle);
  }
}

/*****************                                                  *********************** */

//TODO NGRX TYPEDESALLE REDUCER
export class TypeDeSallesReducer extends EntitiesReducer<TypeDeSalle> {
  private static typeDeSalleReducer: TypeDeSallesReducer | null = null;
  //
  constructor(typeDeSalleActions: TypeDeSallesActions) {
    super(typeDeSalleActions);
  }

  //
  public static getReducer(state: ITypeDeSalle, action: Action) {
    //Pattern singleton
    if (TypeDeSallesReducer.typeDeSalleReducer == null) {
      TypeDeSallesReducer.typeDeSalleReducer = new TypeDeSallesReducer(
        new TypeDeSallesActions()
      );
    }
    return TypeDeSallesReducer.typeDeSalleReducer.entitiesReducer()(
      state,
      action
    );
  }
}
