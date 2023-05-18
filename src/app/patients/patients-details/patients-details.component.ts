import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Patient } from 'src/models/Models';
import { AppState } from 'src/ngrx/Entities.state';
import { RoutesNames } from 'src/routes/routes.config';
import { PatientsSelectors } from '../ngrx/Patients.ngrx';

@Component({
  selector: 'app-patients-details',
  templateUrl: './patients-details.component.html',
  styleUrls: ['./patients-details.component.scss'],
})
export class PatientsDetailsComponent {
  patient$: Observable<Patient> = new Observable();
  readonly routesName = RoutesNames;

  constructor(
    private store: Store<AppState>,
    private patientsSelectors: PatientsSelectors
  ) {}
  ngOnInit(): void {
    this.patient$ = <Observable<Patient>>(
      this.store.select(this.patientsSelectors.getEntitieById())
    );
  }
}
