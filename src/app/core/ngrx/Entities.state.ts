import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { IPoste } from 'src/app/confi-clinique/ngrx/ngrxPoste/Postes.ngrx';
import { IPersonnels } from 'src/app/personnels/ngrx/Personnels.ngrx';

//
export interface IEntitiesState<T> {
  entities: T[];
  entitie: T;
  notification: string[];
  error: string[];
  stateApp: StateApp;
}
//
export enum StateApp {
  initiale = '[STATE/APP] initiale',
  loading = '[STATE/APP] loading',
  loaded = '[STATE/APP] loaded',
  error = '[STATE/APP] error',
}
//
export interface AppState {
  personnels: IPersonnels;
  posts: IPoste;
  router: RouterReducerState;
}
export const AppReducer = {
  routerReducer,
};
//
export const initialeState: any = {
  entities: [],
  entitie: null,
  notification: [],
  error: [],
  stateApp: StateApp.initiale,
};
//
export enum EntitiesNameAPI {
  login = '[Login / API] ',
  admins = '[Admins / API] ',
  patients = '[Patients / API] ',
  personnels = '[Personnels / API] ',
  poste = '[Poste / API] ',
  salle = '[salle / API] ',
  typeDeSalle = '[typeDeSalle / API] ',
  typeDeRV = '[typeDeRV / API] ',
  tache = '[tache / API] ',
  infoClini = '[infoClini / API] ',
  dossierPatient = '[dossierPatient / API] ',
  consultation = '[consultation / API] ',
  ordonnance = '[ordonnance / API] ',
  antecedent = '[antecedent / API] ',
  rendezVous = '[rendezVous / API] ',
  payement = '[payement / API] ',
}
