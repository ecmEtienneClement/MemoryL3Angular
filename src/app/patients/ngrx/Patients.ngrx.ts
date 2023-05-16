import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Patient } from 'src/models/Models';
import { NameModels } from 'src/models/NameModels';
import { EntitiesActions } from 'src/ngrx/Entities.actions';
import { EntitiesEffects } from 'src/ngrx/Entities.effects';
import { EntitiesReducer } from 'src/ngrx/Entities.reducer';
import { EntitiesSelectors } from 'src/ngrx/Entities.selectors';
import { EntitiesNameAPI, IEntitiesState } from 'src/ngrx/Entities.state';
import { PatientApiService } from '../services/Patients.api.service';

//TODO NGRX PATIENTS STATE
export interface IPatients extends IEntitiesState<Patient> {}

/*****************                                                  *********************** */

//TODO NGRX PATIENTS ACTIONS
@Injectable({ providedIn: 'root' })
export class PatientsActions extends EntitiesActions<Patient> {
  constructor() {
    super(EntitiesNameAPI.patients);
  }
}

/*****************                                                  *********************** */

//TODO NGRX PATIENTS EFFECTS
@Injectable()
export class PatientsEffects extends EntitiesEffects<Patient> {
  constructor(
    action: Actions,
    patientActions: PatientsActions,
    patientApiData: PatientApiService
  ) {
    super(action, patientActions, patientApiData, NameModels.patient);
  }
}

/*****************                                                  *********************** */

//TODO NGRX PATIENTS SELECTORS
@Injectable({ providedIn: 'root' })
export class PatientsSelectors extends EntitiesSelectors<Patient> {
  constructor() {
    super(NameModels.patient);
  }
}

/*****************                                                  *********************** */

//TODO NGRX PATIENTS REDUCER
export class PatientsReducer extends EntitiesReducer<Patient> {
  private static patientReducer: PatientsReducer | null = null;
  //
  constructor(patientActions: PatientsActions) {
    super(patientActions);
  }

  //
  public static getReducer(state: IPatients, action: Action) {
    //Pattern singleton
    if (PatientsReducer.patientReducer == null) {
      PatientsReducer.patientReducer = new PatientsReducer(
        new PatientsActions()
      );
    }
    return PatientsReducer.patientReducer.entitiesReducer()(state, action);
  }
}
