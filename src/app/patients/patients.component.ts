import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Patient } from 'src/models/Models';
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

  constructor(
    private store: Store,
    private patientsActions: PatientsActions,
    private patientsSelectors: PatientsSelectors
  ) {}
  ngOnInit(): void {
    this.store.dispatch(this.patientsActions.getAllEntities()());
    this.patients = this.store.select(this.patientsSelectors.getEntities());
  }

  //
  deletePatient(patient: Patient) {
    this.store.dispatch(
      this.patientsActions.delEntitie()({ entitie: patient })
    );
  }
}
