import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Consultation, Personnel } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesActionsTypes } from 'src/app/core/ngrx/Entities.actions';
import { AppState, StateApp } from 'src/app/core/ngrx/Entities.state';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import {
  EntitiesEmit,
  IEntitiesEmit,
} from 'src/app/core/serviceEntities/EntitiesEmit';
import {
  ConsultationsActions,
  ConsultationsSelectors,
} from 'src/app/patients/ngrx/ngrxConsultation/Consultation.ngrx';
import {
  PersonnelsActions,
  PersonnelsSelectors,
} from 'src/app/personnels/ngrx/Personnels.ngrx';

@Component({
  selector: 'app-consultation-upd',
  templateUrl: './consultation-upd.component.html',
  styleUrls: ['./consultation-upd.component.scss'],
})
export class ConsultationUpdComponent implements OnInit {
  personnels$: Observable<Personnel[]> = new Observable<Personnel[]>();
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  notification: string[] = [];
  errorMessage: string[] = [];
  //
  readonly routesName = RoutesNames;
  formConsultation!: FormGroup;
  formConsultation$!: Observable<Consultation>;
  panelOpenState = false;
  idDossier: string = '';
  idPatient: string = '';
  imc: number = 0;
  consultation: Consultation = {
    diagnostiqueMedical: '',
    poids: '',
    taille: '',
    frequenceCardiaque: '',
    temperature: '',
    personnel: '',
    pressionArterielle: '',
    dossierPatient: '',
    imc: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private consultationActions: ConsultationsActions,
    private consultationsSelectors: ConsultationsSelectors,
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
    this.stateApp$ = this.store.select(
      this.consultationsSelectors.getStateApp()
    );
    this.store.select(this.consultationsSelectors.getNotification()).subscribe({
      next: (data) => (this.notification = data),
    });
    this.store.select(this.consultationsSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });

    //
    EntitiesEmit.entitiesSub.pipe(take(1)).subscribe({
      next: (data: IEntitiesEmit) => {
        this.treatmentSub(data);
      },
    });
    this.formConsultation$ = this.formConsultation.valueChanges;
  }
  //
  initForm() {
    this.formConsultation = this.formBuilder.group({
      diagnostiqueMedical: [null, Validators.required],
      poids: [null, Validators.required],
      taille: [null, Validators.required],
      personnel: [null, Validators.required],
      temperature: [null, Validators.required],
      frequenceCardiaque: [null, Validators.required],
      pressionArterielle: [null, Validators.required],
    });
  }
  //
  patchDataForm() {
    this.store.select(this.consultationsSelectors.getEntitieById()).subscribe({
      next: (data) => {
        if (data) {
          this.consultation = data;
          this.formConsultation.patchValue({
            diagnostiqueMedical: data.diagnostiqueMedical,
            poids: data.poids,
            taille: data.taille,
            personnel: data.personnel,
            temperature: data.temperature,
            frequenceCardiaque: data.frequenceCardiaque,
            pressionArterielle: data.pressionArterielle,
          });
        }
      },
      error: (error) => {
        this.store.dispatch(this.consultationActions.errorEntitie()({ error }));
      },
    });
  }

  //
  submitForm() {
    const formConsultation = this.formConsultation.value;
    this.imc = formConsultation.poids / Math.pow(formConsultation.taille, 2);

    const newConsultation: Consultation = {
      diagnostiqueMedical: formConsultation.diagnostiqueMedical,
      poids: formConsultation.poids,
      taille: formConsultation.taille,
      frequenceCardiaque: formConsultation.frequenceCardiaque,
      temperature: formConsultation.temperature,
      personnel: formConsultation.personnel,
      pressionArterielle: formConsultation.pressionArterielle,
      imc: this.imc.toFixed(2).toString(),
      dossierPatient: this.consultation.dossierPatient,
      Personnel: this.consultation.Personnel,
      createdAt: this.consultation.createdAt,
      id: this.consultation.id,
    };
    this.store.dispatch(
      this.consultationActions.updEntitie()({ entitie: newConsultation })
    );
  }
  //
  treatmentSub(data: IEntitiesEmit) {
    if (
      data.nameModel == NameModels.consultation &&
      data.nameAction == EntitiesActionsTypes.updEntitieSuccess
    ) {
      this.router.navigate([
        `/${this.routesName.mPatient.patients}/${this.routesName.mPatient.patientsDossierDetails}/`,
        this.idDossier,
      ]);
    }
  }
}
