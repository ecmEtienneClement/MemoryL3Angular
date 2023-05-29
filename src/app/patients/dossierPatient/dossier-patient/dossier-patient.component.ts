import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {  Observable } from 'rxjs';
import { DossierPatient } from 'src/app/core/models/Models';
import { AppState, StateApp } from 'src/app/core/ngrx/Entities.state';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import {
  DossierPatientsActions,
  DossierPatientsSelectors,
} from '../../ngrx/ngrxDossierPatient/DossierPatient.ngrx';

@Component({
  selector: 'app-dossier-patient',
  templateUrl: './dossier-patient.component.html',
  styleUrls: ['./dossier-patient.component.scss'],
})
export class DossierPatientComponent implements OnInit {
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  dossierPatient: DossierPatient[] = [];
  notification: string[] = [];
  errorMessage: string[] = [];
  id:any=''
  //
  readonly routesName = RoutesNames;
  panelOpenState = false;

  constructor(
    private store: Store<AppState>,
    private dossierPatientsActions: DossierPatientsActions,
    private dossierPatientsSelectors: DossierPatientsSelectors
  ) {}
  //
  ngOnInit() {
    this.id = localStorage.getItem('idRoute');
    this.store.dispatch(this.dossierPatientsActions.getAllEntities()());
    //
    this.store.select(this.dossierPatientsSelectors.getEntities()).subscribe({
      next: (data) => {
        this.dossierPatient = data.filter((data) => data.patient == this.id);
      },
    });
    this.stateApp$ = this.store.select(
      this.dossierPatientsSelectors.getStateApp()
    );
    this.store
      .select(this.dossierPatientsSelectors.getNotification())
      .subscribe({
        next: (data) => (this.notification = data),
      });
    this.store.select(this.dossierPatientsSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });
  }
}
