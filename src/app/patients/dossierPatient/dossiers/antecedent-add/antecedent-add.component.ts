import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Antecedent, Personnel } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesActionsTypes } from 'src/app/core/ngrx/Entities.actions';
import { AppState, StateApp } from 'src/app/core/ngrx/Entities.state';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import {
  EntitiesEmit,
  IEntitiesEmit,
} from 'src/app/core/serviceEntities/EntitiesEmit';
import {
  AntecedentsActions,
  AntecedentsSelectors,
} from 'src/app/patients/ngrx/ngrxAntecedent/Antecedent.ngrx';
import {
  PersonnelsActions,
  PersonnelsSelectors,
} from 'src/app/personnels/ngrx/Personnels.ngrx';

@Component({
  selector: 'app-antecedent-add',
  templateUrl: './antecedent-add.component.html',
  styleUrls: ['./antecedent-add.component.scss'],
})
export class AntecedentAddComponent implements OnInit {
  personnels$: Observable<Personnel[]> = new Observable<Personnel[]>();
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  notification: string[] = [];
  errorMessage: string[] = [];
  //
  readonly routesName = RoutesNames;
  formAntecedent!: FormGroup;
  formAntecedent$!: Observable<Antecedent>;
  panelOpenState = false;
  idDossier: string = '';
  idPatient: string = '';
  imc: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private antecedentsActions: AntecedentsActions,
    private antecedentsSelectors: AntecedentsSelectors,
    private personnelsActions: PersonnelsActions,
    private personnelsSelectors: PersonnelsSelectors,
    private router: Router
  ) {}
  //
  ngOnInit() {
    this.idDossier = <string>localStorage.getItem('idRoute');
    this.idPatient = <string>localStorage.getItem('idPatient');
    this.initForm();
    this.store.dispatch(this.personnelsActions.getAllEntities()());
    this.personnels$ = this.store.select(
      this.personnelsSelectors.getEntities()
    );
    //
    this.stateApp$ = this.store.select(this.antecedentsSelectors.getStateApp());
    this.store.select(this.antecedentsSelectors.getNotification()).subscribe({
      next: (data) => (this.notification = data),
    });
    this.store.select(this.antecedentsSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });

    //
    EntitiesEmit.entitiesSub.pipe(take(1)).subscribe({
      next: (data: IEntitiesEmit) => {
        this.treatmentSub(data);
      },
    });
    this.formAntecedent$ = this.formAntecedent.valueChanges;
  }
  //
  initForm() {
    this.formAntecedent = this.formBuilder.group({
      allergie: [null, Validators.required],
      medicaux: [null, Validators.required],
      chirugicaux: [null, Validators.required],
      familiaire: [null, Validators.required],
      autre: [null, Validators.required],
      personnel: [null, Validators.required],
    });
  }

  //
  submitForm() {
    const formAntecedent = this.formAntecedent.value;

    const newAntecedent: Antecedent = {
      personnel: formAntecedent.personnel,
      allergie: [formAntecedent.allergie],
      autre: [formAntecedent.autre],
      chirugicaux: [formAntecedent.chirugicaux],
      familiaire: [formAntecedent.familiaire],
      medicaux: [formAntecedent.medicaux],
      dossierPatient: this.idDossier,
    };
    this.store.dispatch(
      this.antecedentsActions.addEntitie()({ entitie: newAntecedent })
    );
  }
  //
  treatmentSub(data: IEntitiesEmit) {
    if (
      data.nameModel == NameModels.antecedent &&
      data.nameAction == EntitiesActionsTypes.addEntitieSuccess
    ) {
      this.router.navigate([
        `/${this.routesName.mPatient.patients}/${this.routesName.mPatient.patientsDossierDetails}/`,
        this.idDossier,
      ]);
    }
  }
}
