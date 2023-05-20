import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { InfoClinique } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesActions } from 'src/app/core/ngrx/Entities.actions';
import { EntitiesEffects } from 'src/app/core/ngrx/Entities.effects';
import { EntitiesReducer } from 'src/app/core/ngrx/Entities.reducer';
import { EntitiesSelectors } from 'src/app/core/ngrx/Entities.selectors';
import { EntitiesNameAPI, IEntitiesState } from 'src/app/core/ngrx/Entities.state';
import { InfoCliniApiService } from './InfoCliniApiService';

//TODO NGRX INFOCLINIQUE STATE
export interface IInfoClinique extends IEntitiesState<InfoClinique> {}

/*****************                                                  *********************** */

//TODO NGRX INFOCLINIQUE ACTIONS
@Injectable({ providedIn: 'root' })
export class InfoCliniquesActions extends EntitiesActions<InfoClinique> {
  constructor() {
    super(EntitiesNameAPI.infoClini);
  }
}

/*****************                                                  *********************** */

//TODO NGRX INFOCLINIQUE EFFECTS
@Injectable()
export class InfoCliniquesEffects extends EntitiesEffects<InfoClinique> {
  constructor(
    action: Actions,
    infocliniqueActions: InfoCliniquesActions,
    infocliniqueApiData: InfoCliniApiService
  ) {
    super(
      action,
      infocliniqueActions,
      infocliniqueApiData,
      NameModels.infoClinique
    );
  }
}

/*****************                                                  *********************** */

//TODO NGRX INFOCLINIQUE SELECTORS
@Injectable({ providedIn: 'root' })
export class InfoCliniquesSelectors extends EntitiesSelectors<InfoClinique> {
  constructor() {
    super(NameModels.infoClinique);
  }
}

/*****************                                                  *********************** */

//TODO NGRX INFOCLINIQUE REDUCER
export class InfoCliniquesReducer extends EntitiesReducer<InfoClinique> {
  private static infocliniqueReducer: InfoCliniquesReducer | null = null;
  //
  constructor(infocliniqueActions: InfoCliniquesActions) {
    super(infocliniqueActions);
  }

  //
  public static getReducer(state: IInfoClinique, action: Action) {
    //Pattern singleton
    if (InfoCliniquesReducer.infocliniqueReducer == null) {
      InfoCliniquesReducer.infocliniqueReducer = new InfoCliniquesReducer(
        new InfoCliniquesActions()
      );
    }
    return InfoCliniquesReducer.infocliniqueReducer.entitiesReducer()(
      state,
      action
    );
  }
}
