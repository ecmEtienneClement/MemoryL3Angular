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
  selector: 'app-dossier-patient-upd',
  templateUrl: './dossier-patient-upd.component.html',
  styleUrls: ['./dossier-patient-upd.component.scss'],
})
export class DossierPatientUpdComponent implements OnInit {
  personnels$: Observable<Personnel[]> = new Observable<Personnel[]>();
  dossierPatient: DossierPatient = {
    histoire: [],
    motif: [],
    numeroDossier: '',
    patient: '',
    personnel: [],
    salle: '',
    terrain: [],
  };
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
    this.idPatient = <string>localStorage.getItem('idPatient');
    this.initForm();
    this.store.dispatch(this.dossierPatientsActions.getAllEntities()());
    this.store.dispatch(this.sallesActions.getAllEntities()());
    this.store.dispatch(this.personnelsActions.getAllEntities()());
    this.salles$ = this.store.select(this.salleSelectores.getEntities());
    this.patchDataForm();
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
  patchDataForm() {
    this.store
      .select(this.dossierPatientsSelectors.getEntitieById())
      .subscribe({
        next: (data) => {
          if (data) {
            this.dossierPatient = data;
            this.formDossierPatient.patchValue({
              motif: data.motif,
              histoire: data.histoire,
              terrain: data.terrain,
              personnel: data.personnel,
              salle: data.salle,
            });
          }
        },
        error: (error) => {
          this.store.dispatch(
            this.dossierPatientsActions.errorEntitie()({ error })
          );
        },
      });
  }
  //
  submitForm() {
    const formDossierPatient = this.formDossierPatient.value;
    const newDossierPatient: DossierPatient = {
      patient: this.dossierPatient.patient,
      personnel: formDossierPatient.personnel,
      salle: formDossierPatient.salle,
      histoire: [formDossierPatient.histoire],
      motif: [formDossierPatient.motif],
      terrain: [formDossierPatient.terrain],
      numeroDossier: this.dossierPatient.numeroDossier,
      Personnel: this.dossierPatient.Personnel,
      Salle: this.dossierPatient.Salle,
      createdAt: this.dossierPatient.createdAt,
      id: this.dossierPatient.id,
    };

    this.store.dispatch(
      this.dossierPatientsActions.updEntitie()({ entitie: newDossierPatient })
    );
  }
  //
  treatmentSub(data: IEntitiesEmit) {
    if (
      data.nameModel == NameModels.dossierPatient &&
      data.nameAction == EntitiesActionsTypes.updEntitieSuccess
    ) {
      console.log('upd dossier patient');
      this.router.navigate([
        `/${this.routesName.mPatient.patients}/${this.routesName.mPatient.patientsDossier}/`,
        this.dossierPatient.patient,
      ]);
    }
  }
}
