import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import {
  TypeRendezVousActions,
  TypeRendezVousSelectors,
} from 'src/app/confi-clinique/ngrx/ngrxTypeRV/TypesRV.ngrx';
import {
  Personnel,
  RendezVous,
  TypeRendezVous,
} from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesActionsTypes } from 'src/app/core/ngrx/Entities.actions';
import { AppState, StateApp } from 'src/app/core/ngrx/Entities.state';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import {
  EntitiesEmit,
  IEntitiesEmit,
} from 'src/app/core/serviceEntities/EntitiesEmit';
import {
  RendezVoussActions,
  RendezVoussSelectors,
} from 'src/app/patients/ngrx/ngrxRendezVous/RendezVous.ngrx';
import {
  PersonnelsActions,
  PersonnelsSelectors,
} from 'src/app/personnels/ngrx/Personnels.ngrx';

@Component({
  selector: 'app-rendez-vous-upd',
  templateUrl: './rendez-vous-upd.component.html',
  styleUrls: ['./rendez-vous-upd.component.scss'],
})
export class RendezVousUpdComponent implements OnInit {
  personnels$: Observable<Personnel[]> = new Observable<Personnel[]>();
  typeRv$: Observable<TypeRendezVous[]> = new Observable<TypeRendezVous[]>();
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  notification: string[] = [];
  errorMessage: string[] = [];
  //
  readonly routesName = RoutesNames;
  formRendezVous!: FormGroup;
  formRendezVous$!: Observable<RendezVous>;
  panelOpenState = false;
  idDossier: string = '';
  idPatient: string = '';
  rendezVous: RendezVous = {
    personnel: '',
    date: '',
    motif: '',
    typeRendezVous: '',
    dossierPatient: '',
    secretaire: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private rendezVoussActions: RendezVoussActions,
    private rendezVoussSelectors: RendezVoussSelectors,
    private personnelsActions: PersonnelsActions,
    private personnelsSelectors: PersonnelsSelectors,
    private typeRendezVousActions: TypeRendezVousActions,
    private typeRendezVousSelectors: TypeRendezVousSelectors,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  //
  ngOnInit() {
    this.idDossier = this.activatedRoute.snapshot.params['idDossier'];

    this.idPatient = <string>localStorage.getItem('idPatient');
    this.initForm();
    this.store.dispatch(this.personnelsActions.getAllEntities()());
    this.store.dispatch(this.typeRendezVousActions.getAllEntities()());
    this.personnels$ = this.store.select(
      this.personnelsSelectors.getEntities()
    );
    this.typeRv$ = this.store.select(
      this.typeRendezVousSelectors.getEntities()
    );
    this.patchDataForm();
    //
    this.stateApp$ = this.store.select(this.rendezVoussSelectors.getStateApp());
    this.store.select(this.rendezVoussSelectors.getNotification()).subscribe({
      next: (data) => (this.notification = data),
    });
    this.store.select(this.rendezVoussSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });

    //
    EntitiesEmit.entitiesSub.pipe(take(1)).subscribe({
      next: (data: IEntitiesEmit) => {
        this.treatmentSub(data);
      },
    });
    this.formRendezVous$ = this.formRendezVous.valueChanges;
  }
  //
  initForm() {
    this.formRendezVous = this.formBuilder.group({
      motif: [null, Validators.required],
      date: [null, Validators.required],
      typeRendezVous: [null, Validators.required],
      personnel: [null, Validators.required],
    });
  }
  //
  patchDataForm() {
    this.store.select(this.rendezVoussSelectors.getEntitieById()).subscribe({
      next: (data) => {
        if (data) {
          this.rendezVous = data;
          this.formRendezVous.patchValue({
            motif: data.motif,
            date: data.date,
            typeRendezVous: data.typeRendezVous,
            personnel: data.personnel,
          });
        }
      },
      error: (error) => {
        this.store.dispatch(this.rendezVoussActions.errorEntitie()({ error }));
      },
    });
  }

  //
  submitForm() {
    const formRendezVous = this.formRendezVous.value;
    const newRendezVous: RendezVous = {
      personnel: formRendezVous.personnel,
      date: formRendezVous.date,
      motif: formRendezVous.motif,
      typeRendezVous: formRendezVous.typeRendezVous,
      secretaire: formRendezVous.personnel,
      dossierPatient: this.rendezVous.dossierPatient,
      DossierPatient: this.rendezVous.DossierPatient,
      Personnel: this.rendezVous.Personnel,
      TypeRendezVou: this.rendezVous.TypeRendezVou,
      createdAt: this.rendezVous.createdAt,
      id: this.rendezVous.id,
    };
    this.store.dispatch(
      this.rendezVoussActions.updEntitie()({ entitie: newRendezVous })
    );
  }
  //
  treatmentSub(data: IEntitiesEmit) {
    if (
      data.nameModel == NameModels.rendezVous &&
      data.nameAction == EntitiesActionsTypes.updEntitieSuccess
    ) {
      this.router.navigate([
        `/${this.routesName.mPatient.patients}/${this.routesName.mPatient.patientsDossierDetails}/`,
        this.idDossier,
      ]);
    }
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };
}
