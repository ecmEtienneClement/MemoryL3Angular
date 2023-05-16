import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { I } from 'src/models/Models';
import { EntitiesActions, EntitiesActionsTypes } from './Entities.actions';
import {
  EntitiesDataAPI,
  IResponseAPI,
} from '../serviceEntities/EntitiesDataAPI';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { EntitiesEmit } from 'src/serviceEntities/EntitiesEmit';
import { NameModels } from 'src/models/NameModels';

@Injectable()
export class EntitiesEffects<T extends I> {
  private lastReqDate: number = 0;

  constructor(
    private action: Actions,
    private entitiesActions: EntitiesActions<T>,
    private entitiesDataAPI: EntitiesDataAPI<T>,
    private nameModel: NameModels
  ) {}

  //TODO
  signUpEntitie = createEffect(() =>
    this.action.pipe(
      ofType(this.entitiesActions.signUpEntitie()),
      mergeMap((action) =>
        this.entitiesDataAPI.signUpEntitie(action.entitie).pipe(
          map((resApi: IResponseAPI<T>) => {
            EntitiesEmit.emit({
              nameModel: this.nameModel,
              nameAction: EntitiesActionsTypes.signUpEntitieSuccess,
            });
            return this.entitiesActions.signUpEntitieSuccess()({
              entitie: resApi.entitie,
              msg: resApi.msg,
            });
          }),
          catchError((error) =>
            of(this.entitiesActions.errorEntitie()({ error }))
          )
        )
      )
    )
  );
  //TODO
  signInEntitie = createEffect(() =>
    this.action.pipe(
      ofType(this.entitiesActions.signInEntitie()),
      mergeMap((action) =>
        this.entitiesDataAPI.signInEntitie(action.email, action.mdp).pipe(
          map((resApi: any) => {
            EntitiesEmit.emit({
              nameModel: this.nameModel,
              nameAction: EntitiesActionsTypes.signInEntitieSuccess,
            });

            return this.entitiesActions.signInEntitieSuccess()({ res: resApi });
          }),
          catchError((error) =>
            of(this.entitiesActions.errorEntitie()({ error }))
          )
        )
      )
    )
  );
  //TODO
  addEntitie = createEffect(() =>
    this.action.pipe(
      ofType(this.entitiesActions.addEntitie()),
      mergeMap((action) =>
        this.entitiesDataAPI.addEntitie(action.entitie).pipe(
          map((resApi: IResponseAPI<T>) => {
            EntitiesEmit.emit({
              nameModel: this.nameModel,
              nameAction: EntitiesActionsTypes.addEntitieSuccess,
            });
            return this.entitiesActions.addEntitieSuccess()({
              entitie: resApi.entitie,
              msg: resApi.msg,
            });
          }),
          catchError((error) =>
            of(this.entitiesActions.errorEntitie()({ error }))
          )
        )
      )
    )
  );

  //TODO
  getAllEntities = createEffect(() =>
    this.action.pipe(
      ofType(this.entitiesActions.getAllEntities()),
      mergeMap((action) => {
        //Si la derniere req est moins de 5mn
        if (Date.now() - this.lastReqDate <= 300000) {
          return of();
        }
        //
        this.lastReqDate = Date.now();
        EntitiesEmit.emit({
          nameModel: this.nameModel,
          nameAction: EntitiesActionsTypes.getAllEntitiesSuccess,
        });
        return this.entitiesDataAPI.getAllEntities().pipe(
          map((resApi: IResponseAPI<T>) =>
            this.entitiesActions.getAllEntitiesSuccess()({
              entities: resApi.entities,
              msg: resApi.msg,
            })
          ),

          catchError((error) =>
            of(this.entitiesActions.errorEntitie()({ error }))
          )
        );
      })
    )
  );

  //TODO
  getEntitieById = createEffect(() =>
    this.action.pipe(
      ofType(this.entitiesActions.getEntitieById()),
      mergeMap((action) =>
        this.entitiesDataAPI.getEntitieById(action.entitie).pipe(
          map((resApi: IResponseAPI<T>) => {
            EntitiesEmit.emit({
              nameModel: this.nameModel,
              nameAction: EntitiesActionsTypes.getEntitieByIdSuccess,
            });
            return this.entitiesActions.getEntitieByIdSuccess()({
              entitie: resApi.entitie,
              msg: resApi.msg,
            });
          }),
          catchError((error) =>
            of(this.entitiesActions.errorEntitie()({ error }))
          )
        )
      )
    )
  );

  //TODO
  updEntitie = createEffect(() =>
    this.action.pipe(
      ofType(this.entitiesActions.updEntitie()),
      mergeMap((action) =>
        this.entitiesDataAPI.updEntitie(action.entitie).pipe(
          map((resApi: IResponseAPI<T>) => {
            EntitiesEmit.emit({
              nameModel: this.nameModel,
              nameAction: EntitiesActionsTypes.updEntitieSuccess,
            });
            return this.entitiesActions.updEntitieSuccess()({
              entitie: resApi.entitie,
              msg: resApi.msg,
            });
          }),
          catchError((error) =>
            of(this.entitiesActions.errorEntitie()({ error }))
          )
        )
      )
    )
  );

  //TODO
  delEntitie = createEffect(() =>
    this.action.pipe(
      ofType(this.entitiesActions.delEntitie()),
      mergeMap((action) =>
        this.entitiesDataAPI.delEntitie(action.entitie).pipe(
          map((resApi: IResponseAPI<T>) => {
            EntitiesEmit.emit({
              nameModel: this.nameModel,
              nameAction: EntitiesActionsTypes.delEntitieSuccess,
            });
            return this.entitiesActions.delEntitieSuccess()({
              entitie: action.entitie,
              msg: resApi.msg,
            });
          }),
          catchError((error) =>
            of(this.entitiesActions.errorEntitie()({ error }))
          )
        )
      )
    )
  );
  //TODO
  delAllEntitie = createEffect(() =>
    this.action.pipe(
      ofType(this.entitiesActions.delAllEntities()),
      mergeMap((action) =>
        this.entitiesDataAPI.delAllEntities().pipe(
          map((resApi: IResponseAPI<T>) => {
            EntitiesEmit.emit({
              nameModel: this.nameModel,
              nameAction: EntitiesActionsTypes.delAllEntitieSuccess,
            });
            return this.entitiesActions.delAllEntitiesSuccess()({
              msg: resApi.msg,
            });
          }),
          catchError((error) =>
            of(this.entitiesActions.errorEntitie()({ error }))
          )
        )
      )
    )
  );
}
