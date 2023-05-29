import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Payement, Personnel } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesActionsTypes } from 'src/app/core/ngrx/Entities.actions';
import { AppState, StateApp } from 'src/app/core/ngrx/Entities.state';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import {
  EntitiesEmit,
  IEntitiesEmit,
} from 'src/app/core/serviceEntities/EntitiesEmit';
import {
  PayementsActions,
  PayementsSelectors,
} from 'src/app/patients/ngrx/ngrxPayement/Payement.ngrx';
import {
  PersonnelsActions,
  PersonnelsSelectors,
} from 'src/app/personnels/ngrx/Personnels.ngrx';

@Component({
  selector: 'app-payement-upd',
  templateUrl: './payement-upd.component.html',
  styleUrls: ['./payement-upd.component.scss'],
})
export class PayementUpdComponent implements OnInit {
  personnels$: Observable<Personnel[]> = new Observable<Personnel[]>();
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  notification: string[] = [];
  errorMessage: string[] = [];
  //
  readonly routesName = RoutesNames;
  formPayement!: FormGroup;
  formPayement$!: Observable<Payement>;
  panelOpenState = false;
  idDossier: string = '';
  idPatient: string = '';
  payement: Payement = {
    secretaire: '',
    montant: 0,
    description: '',
    dossierPatient: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private payementsActions: PayementsActions,
    private payementsSelectors: PayementsSelectors,
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
    this.stateApp$ = this.store.select(this.payementsSelectors.getStateApp());
    this.store.select(this.payementsSelectors.getNotification()).subscribe({
      next: (data) => (this.notification = data),
    });
    this.store.select(this.payementsSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });

    //
    EntitiesEmit.entitiesSub.pipe(take(1)).subscribe({
      next: (data: IEntitiesEmit) => {
        this.treatmentSub(data);
      },
    });
    this.formPayement$ = this.formPayement.valueChanges;
  }
  //
  initForm() {
    this.formPayement = this.formBuilder.group({
      montant: [null, Validators.required],
      description: [null, Validators.required],
      personnel: [null, Validators.required],
    });
  }
  //
  patchDataForm() {
    this.store.select(this.payementsSelectors.getEntitieById()).subscribe({
      next: (data) => {
        if (data) {
          this.payement = data;
          this.formPayement.patchValue({
            montant: data.montant,
            description: data.description,
            personnel: data.secretaire,
          });
        }
      },
      error: (error) => {
        this.store.dispatch(this.payementsActions.errorEntitie()({ error }));
      },
    });
  }

  //
  submitForm() {
    const formPayement = this.formPayement.value;
    const newPayement: Payement = {
      secretaire: formPayement.personnel,
      montant: formPayement.montant,
      description: formPayement.description,
      dossierPatient: this.payement.dossierPatient,
      DossierPatient: this.payement.DossierPatient,
      Personnel: this.payement.Personnel,
      Poste: this.payement.Poste,
      createdAt: this.payement.createdAt,
      id: this.payement.id,
    };
    this.store.dispatch(
      this.payementsActions.updEntitie()({ entitie: newPayement })
    );
  }
  //
  treatmentSub(data: IEntitiesEmit) {
    if (
      data.nameModel == NameModels.payement &&
      data.nameAction == EntitiesActionsTypes.updEntitieSuccess
    ) {
      this.router.navigate([
        `/${this.routesName.mPatient.patients}/${this.routesName.mPatient.patientsDossierDetails}/`,
        this.idDossier,
      ]);
    }
  }
}
