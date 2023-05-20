import { createReducer, on } from '@ngrx/store';
import { I } from 'src/app/core/models/Models';
import { EntitiesActions } from './Entities.actions';
import { IEntitiesState, initialeState, StateApp } from './Entities.state';

export class EntitiesReducer<T extends I> {
  constructor(private entitiesAction: EntitiesActions<T>) {}

  public entitiesReducer() {
    return createReducer(
      initialeState,

      //SignUp Entities and Success
      on(this.entitiesAction.signUpEntitie(), (state: IEntitiesState<T>) => ({
        ...state,
        stateApp: StateApp.loading,
      })),
      on(
        this.entitiesAction.signUpEntitieSuccess(),
        (state: IEntitiesState<T>, action) => ({
          ...state,
          entities: [action.entitie, ...state.entities],
          notification: [action.msg, ...state.notification],
          stateApp: StateApp.loaded,
        })
      ),
      //SignIn Entities and Success
      on(this.entitiesAction.signInEntitie(), (state: IEntitiesState<T>) => ({
        ...state,
        stateApp: StateApp.loading,
      })),
      on(
        this.entitiesAction.signInEntitieSuccess(),
        (state: IEntitiesState<T>, action) => ({
          ...state,
          stateApp: StateApp.loaded,
        })
      ),
      //Add Entities and Success
      on(this.entitiesAction.addEntitie(), (state: IEntitiesState<T>) => ({
        ...state,
        stateApp: StateApp.loading,
      })),
      on(
        this.entitiesAction.addEntitieSuccess(),
        (state: IEntitiesState<T>, action) => ({
          ...state,
          entities: [action.entitie, ...state.entities],
          notification: [action.msg, ...state.notification],
          stateApp: StateApp.loaded,
        })
      ),

      //get All Entities and Success
      on(this.entitiesAction.getAllEntities(), (state: IEntitiesState<T>) => ({
        ...state,
        stateApp: StateApp.loading,
      })),
      on(
        this.entitiesAction.getAllEntitiesSuccess(),
        (state: IEntitiesState<T>, action) => ({
          ...state,
          entities: [...action.entities],
          notification: [action.msg, ...state.notification],
          stateApp: StateApp.loaded,
        })
      ),

      //get Entitie by ID and Success
      on(this.entitiesAction.getEntitieById(), (state: IEntitiesState<T>) => ({
        ...state,
        stateApp: StateApp.loading,
      })),
      on(
        this.entitiesAction.getEntitieByIdSuccess(),
        (state: IEntitiesState<T>, action) => ({
          ...state,
          entitie: action.entitie,
          notification: [action.msg, ...state.notification],
          stateApp: StateApp.loaded,
        })
      ),

      //upd Entitie by ID and Success
      on(this.entitiesAction.updEntitie(), (state: IEntitiesState<T>) => ({
        ...state,
        stateApp: StateApp.loading,
      })),
      on(
        this.entitiesAction.updEntitieSuccess(),
        (state: IEntitiesState<T>, action) => {
          const customeEntities: T[] = state.entities.map((entitie) =>
            entitie.id === action.entitie.id ? action.entitie : entitie
          );
          return {
            ...state,
            entities: customeEntities,
            notification: [action.msg, ...state.notification],
            stateApp: StateApp.loaded,
          };
        }
      ),

      //del Entitie by ID and Success
      on(this.entitiesAction.delEntitie(), (state: IEntitiesState<T>) => ({
        ...state,
        stateApp: StateApp.loading,
      })),
      on(
        this.entitiesAction.delEntitieSuccess(),
        (state: IEntitiesState<T>, action) => {
          const customeEntities: T[] = state.entities.filter(
            (entitie) => entitie.id !== action.entitie.id
          );
          return {
            ...state,
            entities: customeEntities,
            notification: [action.msg, ...state.notification],
            stateApp: StateApp.loaded,
          };
        }
      ),

      //del All Entitie and Success
      on(this.entitiesAction.delAllEntities(), (state: IEntitiesState<T>) => ({
        ...state,
        stateApp: StateApp.loading,
      })),
      on(
        this.entitiesAction.delAllEntitiesSuccess(),
        (state: IEntitiesState<T>, action) => ({
          ...state,
          notification: [action.msg, ...state.notification],
          stateApp: StateApp.loaded,
        })
      ),

      //error
      on(
        this.entitiesAction.errorEntitie(),
        (state: IEntitiesState<T>, action) => ({
          ...state,
          error: [action.error, ...state.error],
          stateApp: StateApp.error,
        })
      )
    );
  }
}
