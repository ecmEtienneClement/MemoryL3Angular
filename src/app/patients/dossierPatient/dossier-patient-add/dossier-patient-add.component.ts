import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import {
  SallesActions,
  SallesSelectors,
} from 'src/app/confi-clinique/ngrx/ngrxSalle/Salles.ngrx';
import { DossierPatient, Personnel, Salle } from 'src/app/core/models/Models';
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
import {
  DossierPatientsActions,
  DossierPatientsSelectors,
} from '../../ngrx/ngrxDossierPatient/DossierPatient.ngrx';

@Component({
  selector: 'app-dossier-patient-add',
  templateUrl: './dossier-patient-add.component.html',
  styleUrls: ['./dossier-patient-add.component.scss'],
})
export class DossierPatientAddComponent implements OnInit {
  personnels$: Observable<Personnel[]> = new Observable<Personnel[]>();
  salles$: Observable<Salle[]> = new Observable();
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  notification: string[] = [];
  errorMessage: string[] = [];
  //
  readonly routesName = RoutesNames;
  formDossierPatient!: FormGroup;
  formDossierPatient$!: Observable<DossierPatient>;
  panelOpenState = false;
  idPatient: string = '';
  grpSanguin: string[] = ['O-', 'O+', 'B-', 'A-', 'AB+', 'AB-'];
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private dossierPatientsActions: DossierPatientsActions,
    private dossierPatientsSelectors: DossierPatientsSelectors,
    private personnelsActions: PersonnelsActions,
    private personnelsSelectors: PersonnelsSelectors,
    private router: Router,
    private sallesActions: SallesActions,
    private salleSelectores: SallesSelectors
  ) {}
  //
  ngOnInit() {
    this.idPatient = <string>localStorage.getItem('idRoute');
    this.initForm();
    this.store.dispatch(this.dossierPatientsActions.getAllEntities()());
    this.store.dispatch(this.sallesActions.getAllEntities()());
    this.store.dispatch(this.personnelsActions.getAllEntities()());
    this.salles$ = this.store.select(this.salleSelectores.getEntities());
    this.personnels$ = this.store.select(
      this.personnelsSelectors.getEntities()
    );
    //
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

    //
    EntitiesEmit.entitiesSub.pipe(take(1)).subscribe({
      next: (data: IEntitiesEmit) => {
        this.treatmentSub(data);
      },
    });
    this.formDossierPatient$ = this.formDossierPatient.valueChanges;
  }
  //
  initForm() {
    this.formDossierPatient = this.formBuilder.group({
      motif: [null, Validators.required],
      histoire: [null, Validators.required],
      terrain: [null, Validators.required],
      personnel: [null, Validators.required],
      salle: [null, Validators.required],
    });
  }
  //
  submitForm() {
    const nbr = Math.random() * 100000;
    const customeNbr = nbr.toFixed(2);
    const formDossierPatient = this.formDossierPatient.value;
    const newDossierPatient: DossierPatient = {
      patient: this.idPatient,
      personnel: formDossierPatient.personnel,
      salle: formDossierPatient.salle,
      histoire: [formDossierPatient.histoire],
      motif: [formDossierPatient.motif],
      terrain: [formDossierPatient.terrain],
      numeroDossier: customeNbr.toString(),
    };

    this.store.dispatch(
      this.dossierPatientsActions.addEntitie()({ entitie: newDossierPatient })
    );
  }
  //
  treatmentSub(data: IEntitiesEmit) {
    if (
      data.nameModel == NameModels.dossierPatient &&
      data.nameAction == EntitiesActionsTypes.addEntitieSuccess
    ) {
      console.log('add dossier patient');
      this.router.navigate([
        `/${this.routesName.mPatient.patients}/${this.routesName.mPatient.patientsDossier}/`,
        data.idModel,
      ]);
    }
  }
}
