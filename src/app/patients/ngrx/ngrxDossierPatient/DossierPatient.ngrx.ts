import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { DossierPatient } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesActions } from 'src/app/core/ngrx/Entities.actions';
import { EntitiesEffects } from 'src/app/core/ngrx/Entities.effects';
import { EntitiesReducer } from 'src/app/core/ngrx/Entities.reducer';
import { EntitiesSelectors } from 'src/app/core/ngrx/Entities.selectors';
import {
  EntitiesNameAPI,
  IEntitiesState,
} from 'src/app/core/ngrx/Entities.state';
import { DossierPatientApiService } from './DossierPatientApiService';

//TODO NGRX DOSSIERPATIENT STATE
export interface IDossierPatient extends IEntitiesState<DossierPatient> {}

/*****************                                                  *********************** */

//TODO NGRX DOSSIERPATIENT ACTIONS
@Injectable({ providedIn: 'root' })
export class DossierPatientsActions extends EntitiesActions<DossierPatient> {
  constructor() {
    super(EntitiesNameAPI.dossierPatient);
  }
}

/*****************                                                  *********************** */

//TODO NGRX DOSSIERPATIENT EFFECTS
@Injectable()
export class DossierPatientsEffects extends EntitiesEffects<DossierPatient> {
  constructor(
    action: Actions,
    dossierPatientActions: DossierPatientsActions,
    dossierPatientApiService: DossierPatientApiService
  ) {
    super(
      action,
      dossierPatientActions,
      dossierPatientApiService,
      NameModels.dossierPatient
    );
  }
}

/*****************                                                  *********************** */

//TODO NGRX DOSSIERPATIENT SELECTORS
@Injectable({ providedIn: 'root' })
export class DossierPatientsSelectors extends EntitiesSelectors<DossierPatient> {
  constructor() {
    super(NameModels.dossierPatient);
  }
}

/*****************                                                  *********************** */

//TODO NGRX DOSSIERPATIENT REDUCER
export class DossierPatientsReducer extends EntitiesReducer<DossierPatient> {
  private static dossierPatientReducer: DossierPatientsReducer | null = null;
  //
  constructor(dossierPatientActions: DossierPatientsActions) {
    super(dossierPatientActions);
  }

  //
  public static getReducer(state: IDossierPatient, action: Action) {
    //Pattern singleton
    if (DossierPatientsReducer.dossierPatientReducer == null) {
      DossierPatientsReducer.dossierPatientReducer = new DossierPatientsReducer(
        new DossierPatientsActions()
      );
    }
    return DossierPatientsReducer.dossierPatientReducer.entitiesReducer()(
      state,
      action
    );
  }
}
