import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Consultation } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesActions } from 'src/app/core/ngrx/Entities.actions';
import { EntitiesEffects } from 'src/app/core/ngrx/Entities.effects';
import { EntitiesReducer } from 'src/app/core/ngrx/Entities.reducer';
import { EntitiesSelectors } from 'src/app/core/ngrx/Entities.selectors';
import {
  EntitiesNameAPI,
  IEntitiesState,
} from 'src/app/core/ngrx/Entities.state';
import { ConsultationApiService } from './ConsultationApiService';

//TODO NGRX CONSULTATION STATE
export interface IConsultation extends IEntitiesState<Consultation> {}

/*****************                                                  *********************** */

//TODO NGRX CONSULTATION ACTIONS
@Injectable({ providedIn: 'root' })
export class ConsultationsActions extends EntitiesActions<Consultation> {
  constructor() {
    super(EntitiesNameAPI.consultation);
  }
}

/*****************                                                  *********************** */

//TODO NGRX CONSULTATION EFFECTS
@Injectable()
export class ConsultationsEffects extends EntitiesEffects<Consultation> {
  constructor(
    action: Actions,
    consultationActions: ConsultationsActions,
    consultationApiService: ConsultationApiService
  ) {
    super(
      action,
      consultationActions,
      consultationApiService,
      NameModels.consultation
    );
  }
}

/*****************                                                  *********************** */

//TODO NGRX CONSULTATION SELECTORS
@Injectable({ providedIn: 'root' })
export class ConsultationsSelectors extends EntitiesSelectors<Consultation> {
  constructor() {
    super(NameModels.consultation);
  }
}

/*****************                                                  *********************** */

//TODO NGRX CONSULTATION REDUCER
export class ConsultationsReducer extends EntitiesReducer<Consultation> {
  private static consultationReducer: ConsultationsReducer | null = null;
  //
  constructor(consultationActions: ConsultationsActions) {
    super(consultationActions);
  }
  //
  public static getReducer(state: IConsultation, action: Action) {
    //Pattern singleton
    if (ConsultationsReducer.consultationReducer == null) {
      ConsultationsReducer.consultationReducer = new ConsultationsReducer(
        new ConsultationsActions()
      );
    }
    return ConsultationsReducer.consultationReducer.entitiesReducer()(
      state,
      action
    );
  }
}
