import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Personnel } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesActions } from 'src/app/core/ngrx/Entities.actions';
import { EntitiesEffects } from 'src/app/core/ngrx/Entities.effects';
import { EntitiesReducer } from 'src/app/core/ngrx/Entities.reducer';
import { EntitiesSelectors } from 'src/app/core/ngrx/Entities.selectors';
import { EntitiesNameAPI, IEntitiesState } from 'src/app/core/ngrx/Entities.state';
import { PersonnelApiService } from '../services/Personnels.api.service';

//TODO NGRX PERSONNELS STATE
export interface IPersonnels extends IEntitiesState<Personnel> {}

/*****************                                                  *********************** */

//TODO NGRX PERSONNELS ACTIONS
@Injectable({ providedIn: 'root' })
export class PersonnelsActions extends EntitiesActions<Personnel> {
  constructor() {
    super(EntitiesNameAPI.personnels);
  }
}

/*****************                                                  *********************** */

//TODO NGRX PERSONNELS EFFECTS
@Injectable()
export class PersonnelsEffects extends EntitiesEffects<Personnel> {
  constructor(
    action: Actions,
    personnelActions: PersonnelsActions,
    personnelApiData: PersonnelApiService
  ) {
    super(action, personnelActions, personnelApiData, NameModels.personnel);
  }
}

/*****************                                                  *********************** */

//TODO NGRX PERSONNELS SELECTORS
@Injectable({ providedIn: 'root' })
export class PersonnelsSelectors extends EntitiesSelectors<Personnel> {
  constructor() {
    super(NameModels.personnel);
  }
}

/*****************                                                  *********************** */

//TODO NGRX PERSONNELS REDUCER
export class PersonnelsReducer extends EntitiesReducer<Personnel> {
  private static personnelReducer: PersonnelsReducer | null = null;
  //
  constructor(personnelActions: PersonnelsActions) {
    super(personnelActions);
  }

  //
  public static getReducer(state: IPersonnels, action: Action) {
    //Pattern singleton
    if (PersonnelsReducer.personnelReducer == null) {
      PersonnelsReducer.personnelReducer = new PersonnelsReducer(
        new PersonnelsActions()
      );
    }
    return PersonnelsReducer.personnelReducer.entitiesReducer()(state, action);
  }
}
