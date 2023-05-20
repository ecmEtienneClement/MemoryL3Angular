import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Patient } from 'src/models/Models';
import { NameModels } from 'src/models/NameModels';
import { EntitiesActionsTypes } from 'src/ngrx/Entities.actions';
import { AppState, StateApp } from 'src/ngrx/Entities.state';
import { RoutesNames } from 'src/routes/routes.config';
import { EntitiesEmit, IEntitiesEmit } from 'src/serviceEntities/EntitiesEmit';
import { PatientsActions, PatientsSelectors } from '../ngrx/Patients.ngrx';

@Component({
  selector: 'app-patients-add',
  templateUrl: './patients-add.component.html',
  styleUrls: ['./patients-add.component.scss'],
})
export class PatientsAddComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  notification: string[] = [];
  errorMessage: string[] = [];
  //
  readonly routesName = RoutesNames;
  formPatient!: FormGroup;
  panelOpenState = false;
  grpSanguin: string[] = ['O-', 'O+', 'B-', 'A-', 'AB+', 'AB-'];
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private patientsActions: PatientsActions,
    private patientsSelectors: PatientsSelectors,
    private router: Router
  ) {}
  //
  ngOnInit() {
    this.initForm();
    this.store.dispatch(this.patientsActions.getAllEntities()());
    //
    this.stateApp$ = this.store.select(this.patientsSelectors.getStateApp());
    this.store.select(this.patientsSelectors.getNotification()).subscribe({
      next: (data) => (this.notification = data),
    });
    this.store.select(this.patientsSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });
    this.sub.add(
      EntitiesEmit.entitiesSub.subscribe({
        next: (data: IEntitiesEmit) => {
          this.treatmentSub(data);
        },
      })
    );
  }
  //
  initForm() {
    this.formPatient = this.formBuilder.group({
      nom: [null, [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      prenom: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      adresse: [
        null,
        [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')],
      ],
      age: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      sexe: [null, [Validators.required, Validators.pattern('^[MF]*$')]],
      telephone: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      dateDeNaissance: [null, [Validators.required]],
      groupeSanguin: [null, [Validators.required]],
      proffession: [
        null,
        [Validators.required, Validators.pattern('^[a-zA-Z]*$')],
      ],
    });
  }
  //
  submitForm() {
    const formPatient = this.formPatient.value;
    const newPatient: Patient = {
      nom: formPatient.nom,
      prenom: formPatient.prenom,
      adresse: formPatient.adresse,
      age: formPatient.age,
      sexe: formPatient.sexe,
      telephone: formPatient.telephone,
      dateDeNaissance: formPatient.dateDeNaissance,
      groupeSanguin: formPatient.groupeSanguin,
      proffession: formPatient.proffession,
    };

    this.store.dispatch(
      this.patientsActions.addEntitie()({ entitie: newPatient })
    );
  }
  //
  treatmentSub(data: IEntitiesEmit) {
    if (
      data.nameModel == NameModels.patient &&
      data.nameAction == EntitiesActionsTypes.addEntitieSuccess
    ) {
      this.router.navigate([
        `/${this.routesName.mPatient.patients}/${this.routesName.mPatient.patientsDetails}/`,
        data.idModel,
      ]);
    }
  }

  //
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
