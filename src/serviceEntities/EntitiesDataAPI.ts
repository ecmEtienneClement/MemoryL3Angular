import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/env/env';
import { I } from 'src/models/Models';
import { NameModels } from 'src/models/NameModels';

@Injectable()
export class EntitiesDataAPI<T extends I> {
  constructor(private httpClient: HttpClient, private nameModel: NameModels) {}

  //
  public signUpEntitie(entitie: T): Observable<IResponseAPI<T>> {
    return this.httpClient
      .post<IResponseAPI<T>>(environment.hostDev + 'signUp/', entitie)
      .pipe(retry(1));
  }

  //
  public signInEntitie(email: string, mdp: string): Observable<any> {
    return this.httpClient
      .post<any>(environment.hostDev + 'signIn/', { email, mdp })
      .pipe(retry(1));
  }
  /**
 * id,
      nom,
      prenom,
      email,
      ip,
      userAg,
      token:
 */
  //
  public addEntitie(entitie: T): Observable<IResponseAPI<T>> {
    return this.httpClient
      .post<IResponseAPI<T>>(environment.hostDev + this.nameModel, entitie)
      .pipe(retry(1));
  }

  //
  public getAllEntities(): Observable<IResponseAPI<T>> {
    return this.httpClient
      .get<IResponseAPI<T>>(environment.hostDev + this.nameModel)
      .pipe(retry(1));
  }

  //
  public getEntitieById(entitie: T): Observable<IResponseAPI<T>> {
    return this.httpClient
      .get<IResponseAPI<T>>(
        environment.hostDev + this.nameModel + '/' + entitie.id
      )
      .pipe(retry(1));
  }

  //
  public updEntitie(entitie: T): Observable<IResponseAPI<T>> {
    return this.httpClient
      .put<IResponseAPI<T>>(
        environment.hostDev + this.nameModel + '/' + entitie.id,
        entitie
      )
      .pipe(retry(1));
  }

  //
  public delEntitie(entitie: T): Observable<IResponseAPI<T>> {
    return this.httpClient
      .delete<IResponseAPI<T>>(
        environment.hostDev + this.nameModel + '/' + entitie.id
      )
      .pipe(retry(1));
  }

  //
  public delAllEntities(): Observable<IResponseAPI<T>> {
    return this.httpClient
      .delete<IResponseAPI<T>>(environment.hostDev + this.nameModel + '/all')
      .pipe(retry(1));
  }
}
//Model de reponse de l'api
export interface IResponseAPI<T> {
  entities: T[];
  entitie: T;
  msg: string;
}
