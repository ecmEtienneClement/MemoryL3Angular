import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Patient } from 'src/models/Models';
import { StateApp } from 'src/ngrx/Entities.state';
import { RoutesNames } from 'src/routes/routes.config';
import { PatientsActions, PatientsSelectors } from './ngrx/Patients.ngrx';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  patients: Observable<Patient[]> = new Observable<Patient[]>();
  readonly routesName = RoutesNames;
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  notification: string[] = [];
  errorMessage: string[] = [];

  constructor(
    private store: Store,
    private patientsActions: PatientsActions,
    private patientsSelectors: PatientsSelectors
  ) {}
  ngOnInit(): void {
    this.store.dispatch(this.patientsActions.getAllEntities()());
    this.patients = this.store.select(this.patientsSelectors.getEntities());

    //
    this.stateApp$ = this.store.select(this.patientsSelectors.getStateApp());
    this.store.select(this.patientsSelectors.getNotification()).subscribe({
      next: (data) => (this.notification = data),
    });
    this.store.select(this.patientsSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });
  }

  //
  deletePatient(patient: Patient) {
    this.store.dispatch(
      this.patientsActions.delEntitie()({ entitie: patient })
    );
  }
}
