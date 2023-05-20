import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/core/models/Models';
import { AppState, StateApp } from 'src/app/core/ngrx/Entities.state';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import { PatientsSelectors } from '../ngrx/Patients.ngrx';

@Component({
  selector: 'app-patients-details',
  templateUrl: './patients-details.component.html',
  styleUrls: ['./patients-details.component.scss'],
})
export class PatientsDetailsComponent {
  patient$: Observable<Patient> = new Observable();
  readonly routesName = RoutesNames;
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  notification: string[] = [];
  errorMessage: string[] = [];

  constructor(
    private store: Store<AppState>,
    private patientsSelectors: PatientsSelectors
  ) {}
  ngOnInit(): void {
    this.patient$ = <Observable<Patient>>(
      this.store.select(this.patientsSelectors.getEntitieById())
    );

    //
    this.stateApp$ = this.store.select(this.patientsSelectors.getStateApp());
    this.store.select(this.patientsSelectors.getNotification()).subscribe({
      next: (data) => (this.notification = data),
    });
    this.store.select(this.patientsSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });
  }
}
