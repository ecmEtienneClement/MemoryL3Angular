import { Injectable } from '@angular/core';
import { createAction, props } from '@ngrx/store';
import { EntitiesNameAPI } from './Entities.state';

@Injectable()
export class EntitiesActions<T> {
  constructor(private entitiesNameAPI: EntitiesNameAPI) {}

  // Action SignIn and Success
  public signUpEntitie() {
    return createAction(
      this.entitiesNameAPI + EntitiesActionsTypes.signUpEntitie,
      props<{ entitie: T }>()
    );
  }
  public signUpEntitieSuccess() {
    return createAction(
      this.entitiesNameAPI + EntitiesActionsTypes.signUpEntitieSuccess,
      props<{ entitie: T; msg: string }>()
    );
  }
  // Action SignUp and Success
  public signInEntitie() {
    return createAction(
      this.entitiesNameAPI + EntitiesActionsTypes.signInEntitie,
      props<{ email: string; mdp: string }>()
    );
  }
  public signInEntitieSuccess() {
    return createAction(
      this.entitiesNameAPI + EntitiesActionsTypes.signInEntitieSuccess,
      props<{ res: any }>()
    );
  }
  // Action Add and Success
  public addEntitie() {
    return createAction(
      this.entitiesNameAPI + EntitiesActionsTypes.addEntitie,
      props<{ entitie: T }>()
    );
  }
  public addEntitieSuccess() {
    return createAction(
      this.entitiesNameAPI + EntitiesActionsTypes.addEntitieSuccess,
      props<{ entitie: T; msg: string }>()
    );
  }

  // Action get and Success
  public getEntitieById() {
    return createAction(
      this.entitiesNameAPI + EntitiesActionsTypes.getEntitieById,
      props<{ entitie: T }>()
    );
  }
  public getEntitieByIdSuccess() {
    return createAction(
      this.entitiesNameAPI + EntitiesActionsTypes.getEntitieByIdSuccess,
      props<{ entitie: T; msg: string }>()
    );
  }

  // Action get All and Success
  public getAllEntities() {
    return createAction(
      this.entitiesNameAPI + EntitiesActionsTypes.getAllEntities
    );
  }
  public getAllEntitiesSuccess() {
    return createAction(
      this.entitiesNameAPI + EntitiesActionsTypes.getAllEntitiesSuccess,
      props<{ entities: T[]; msg: string }>()
    );
  }

  // Action upd and Success
  public updEntitie() {
    return createAction(
      this.entitiesNameAPI + EntitiesActionsTypes.updEntitie,
      props<{ entitie: T }>()
    );
  }
  public updEntitieSuccess() {
    return createAction(
      this.entitiesNameAPI + EntitiesActionsTypes.updEntitieSuccess,
      props<{ entitie: T; msg: string }>()
    );
  }

  // Action del and Success
  public delEntitie() {
    return createAction(
      this.entitiesNameAPI + EntitiesActionsTypes.delEntitie,
      props<{ entitie: T }>()
    );
  }
  public delEntitieSuccess() {
    return createAction(
      this.entitiesNameAPI + EntitiesActionsTypes.delEntitieSuccess,
      props<{ entitie: T; msg: string }>()
    );
  }

  // Action del and Success
  public delAllEntities() {
    return createAction(
      this.entitiesNameAPI + EntitiesActionsTypes.delAllEntitie
    );
  }
  public delAllEntitiesSuccess() {
    return createAction(
      this.entitiesNameAPI + EntitiesActionsTypes.delAllEntitieSuccess,
      props<{ msg: string }>()
    );
  }

  // Action error
  public errorEntitie() {
    return createAction(
      this.entitiesNameAPI + EntitiesActionsTypes.errorEntitie,
      props<{ error: string }>()
    );
  }
}
//
export enum EntitiesActionsTypes {
  signInEntitie = 'signInEntitie',
  signInEntitieSuccess = 'signInEntitieSuccess',
  signUpEntitie = 'signUpEntitie',
  signUpEntitieSuccess = 'signUpEntitieSuccess',
  addEntitie = 'addEntitie',
  addEntitieSuccess = 'addEntitieSucces',
  getEntitieById = 'getEntitieById',
  getEntitieByIdSuccess = 'getEntitieByIdSuccess',
  getAllEntities = 'getEntities',
  getAllEntitiesSuccess = 'getEntitiesSuccess',
  updEntitie = 'updEntitie',
  updEntitieSuccess = 'updEntitieSuccess ',
  delEntitie = 'delEntitie',
  delEntitieSuccess = 'delEntitieSuccess ',
  delAllEntitie = 'delAllEntitie',
  delAllEntitieSuccess = 'delAllEntitieSuccess ',
  errorEntitie = 'errorEntitie',
}
