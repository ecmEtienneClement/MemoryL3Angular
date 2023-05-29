import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Ordonnance, Personnel } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesActionsTypes } from 'src/app/core/ngrx/Entities.actions';
import { AppState, StateApp } from 'src/app/core/ngrx/Entities.state';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import {
  EntitiesEmit,
  IEntitiesEmit,
} from 'src/app/core/serviceEntities/EntitiesEmit';
import {
  OrdonnancesActions,
  OrdonnancesSelectors,
} from 'src/app/patients/ngrx/ngrxOrdonnance/Ordonnance.ngrx';
import {
  PersonnelsActions,
  PersonnelsSelectors,
} from 'src/app/personnels/ngrx/Personnels.ngrx';

@Component({
  selector: 'app-ordonnance-upd',
  templateUrl: './ordonnance-upd.component.html',
  styleUrls: ['./ordonnance-upd.component.scss'],
})
export class OrdonnanceUpdComponent implements OnInit {
  personnels$: Observable<Personnel[]> = new Observable<Personnel[]>();
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  notification: string[] = [];
  errorMessage: string[] = [];
  //
  readonly routesName = RoutesNames;
  formOrdonnance!: FormGroup;
  formOrdonnance$!: Observable<Ordonnance>;
  panelOpenState = false;
  idDossier: string = '';
  idPatient: string = '';

  ordonnance: Ordonnance = {
    personnel: '',
    tbOrdonnance: [],
    dossierPatient: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private ordonnancesActions: OrdonnancesActions,
    private ordonnancesSelectors: OrdonnancesSelectors,
    private personnelsActions: PersonnelsActions,
    private personnelsSelectors: PersonnelsSelectors,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  //
  ngOnInit() {
    this.idDossier = this.activatedRoute.snapshot.params['idDossier'];
    this.idPatient = <string>localStorage.getItem('idPatient');
    this.initForm();
    this.store.dispatch(this.personnelsActions.getAllEntities()());
    this.personnels$ = this.store.select(
      this.personnelsSelectors.getEntities()
    );
    this.patchDataForm();
    //
    this.stateApp$ = this.store.select(this.ordonnancesSelectors.getStateApp());
    this.store.select(this.ordonnancesSelectors.getNotification()).subscribe({
      next: (data) => (this.notification = data),
    });
    this.store.select(this.ordonnancesSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });

    //
    EntitiesEmit.entitiesSub.pipe(take(1)).subscribe({
      next: (data: IEntitiesEmit) => {
        this.treatmentSub(data);
      },
    });
    this.formOrdonnance$ = this.formOrdonnance.valueChanges;
  }
  //
  initForm() {
    this.formOrdonnance = this.formBuilder.group({
      tbOrdonnance: [null, Validators.required],
      personnel: [null, Validators.required],
    });
  }
  //
  patchDataForm() {
    this.store.select(this.ordonnancesSelectors.getEntitieById()).subscribe({
      next: (data) => {
        if (data) {
          this.ordonnance = data;
          this.formOrdonnance.patchValue({
            tbOrdonnance: data.tbOrdonnance,
            personnel: data.personnel,
          });
        }
      },
      error: (error) => {
        this.store.dispatch(this.ordonnancesActions.errorEntitie()({ error }));
      },
    });
  }

  //
  submitForm() {
    const formOrdonnance = this.formOrdonnance.value;

    const newOrdonnance: Ordonnance = {
      personnel: formOrdonnance.personnel,
      tbOrdonnance: [formOrdonnance.tbOrdonnance],
      dossierPatient: this.ordonnance.dossierPatient,
      DossierPatient: this.ordonnance.DossierPatient,
      Personnel: this.ordonnance.Personnel,
      createdAt: this.ordonnance.createdAt,
      id: this.ordonnance.id,
    };
    this.store.dispatch(
      this.ordonnancesActions.updEntitie()({ entitie: newOrdonnance })
    );
  }
  //
  treatmentSub(data: IEntitiesEmit) {
    if (
      data.nameModel == NameModels.ordonnance &&
      data.nameAction == EntitiesActionsTypes.updEntitieSuccess
    ) {
      this.router.navigate([
        `/${this.routesName.mPatient.patients}/${this.routesName.mPatient.patientsDossierDetails}/`,
        this.idDossier,
      ]);
    }
  }
}
