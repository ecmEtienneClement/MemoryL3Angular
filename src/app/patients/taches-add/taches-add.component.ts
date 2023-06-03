import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Patient, Personnel, Tache } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesActionsTypes } from 'src/app/core/ngrx/Entities.actions';
import { AppState, StateApp } from 'src/app/core/ngrx/Entities.state';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import {
  EntitiesEmit,
  IEntitiesEmit,
} from 'src/app/core/serviceEntities/EntitiesEmit';
import {
  PersonnelsActions,
  PersonnelsSelectors,
} from 'src/app/personnels/ngrx/Personnels.ngrx';
import { TachesActions, TachesSelectors } from '../ngrx/ngrxTache/Tache.ngrx';
import { PatientsActions, PatientsSelectors } from '../ngrx/Patients.ngrx';

@Component({
  selector: 'app-taches-add',
  templateUrl: './taches-add.component.html',
  styleUrls: ['./taches-add.component.scss'],
})
export class TachesAddComponent implements OnInit {
  personnels$: Observable<Personnel[]> = new Observable<Personnel[]>();
  patient$: Observable<Patient[]> = new Observable<Patient[]>();
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  notification: string[] = [];
  errorMessage: string[] = [];
  //
  readonly routesName = RoutesNames;
  formTache!: FormGroup;
  panelOpenState = false;
  idDossier: string = '';
  idPatient: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private patientsActions: PatientsActions,
    private patientsSelectors: PatientsSelectors,
    private personnelsActions: PersonnelsActions,
    private personnelsSelectors: PersonnelsSelectors,
    private tachesActions: TachesActions,
    private tachesSelectors: TachesSelectors,
    private router: Router
  ) {}
  //
  ngOnInit() {
    this.idDossier = <string>localStorage.getItem('idRoute');
    this.idPatient = <string>localStorage.getItem('idPatient');
    this.initForm();
    this.store.dispatch(this.personnelsActions.getAllEntities()());
    this.store.dispatch(this.patientsActions.getAllEntities()());
    this.personnels$ = this.store.select(
      this.personnelsSelectors.getEntities()
    );
    this.patient$ = this.store.select(this.patientsSelectors.getEntities());
    //
    this.stateApp$ = this.store.select(this.tachesSelectors.getStateApp());
    this.store.select(this.tachesSelectors.getNotification()).subscribe({
      next: (data) => (this.notification = data),
    });
    this.store.select(this.tachesSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });

    //
    EntitiesEmit.entitiesSub.pipe(take(1)).subscribe({
      next: (data: IEntitiesEmit) => {
        this.treatmentSub(data);
      },
    });
  }
  //
  initForm() {
    this.formTache = this.formBuilder.group({
      personnel: [null, Validators.required],
      perfusion: [null, Validators.required],
      prelevement: [null, Validators.required],
      prisMedicament: [null, Validators.required],
    });
  }

  //
  submitForm() {
    const formTache = this.formTache.value;
    const newTache: Tache = {
      infirmier: formTache.personnel,
      perfusion: [formTache.perfusion],
      prelevement: [formTache.prelevement],
      prisMedicament: [formTache.prisMedicament],
    };
    console.log(JSON.stringify(newTache));
    this.store.dispatch(this.tachesActions.addEntitie()({ entitie: newTache }));
  }
  //
  treatmentSub(data: IEntitiesEmit) {
    if (
      data.nameModel == NameModels.tache &&
      data.nameAction == EntitiesActionsTypes.addEntitieSuccess
    ) {
      this.router.navigate([
        `/${this.routesName.mPatient.patients}/${this.routesName.mPatient.patientsTaches}`,
      ]);
    }
  }
}
