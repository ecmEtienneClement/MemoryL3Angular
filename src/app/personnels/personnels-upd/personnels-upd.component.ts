import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import {
  PostesActions,
  PostesSelectors,
} from 'src/app/confi-clinique/ngrx/ngrxPoste/Postes.ngrx';
import { Personnel, Poste, Sexe } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesActionsTypes } from 'src/app/core/ngrx/Entities.actions';
import { AppState, StateApp } from 'src/app/core/ngrx/Entities.state';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import { EntitiesEmit, IEntitiesEmit } from 'src/app/core/serviceEntities/EntitiesEmit';
import {
  PersonnelsActions,
  PersonnelsSelectors,
} from '../ngrx/Personnels.ngrx';

@Component({
  selector: 'app-personnels-upd',
  templateUrl: './personnels-upd.component.html',
  styleUrls: ['./personnels-upd.component.scss'],
})
export class PersonnelsUpdComponent implements OnInit {
  readonly routesName = RoutesNames;
  notification: string[] = [];
  errorMessage: string[] = [];
  stateApp$: Observable<StateApp> = new Observable<StateApp>();

  //
  formPersonnel!: FormGroup;
  posts: Observable<Poste[]> = new Observable<Poste[]>();
  personnel: Personnel = {
    nom: '',
    prenom: '',
    adresse: '',
    email: '',
    age: 0,
    sexe: Sexe.M,
    telephone: [],
    mdp: '',
    salaire: 0,
    profil: '',
    jour: [],
  };
  daysList: string[] = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private personnelsActions: PersonnelsActions,
    private postsActions: PostesActions,
    private postsSelectors: PostesSelectors,
    private personnelsSelectors: PersonnelsSelectors,
    private router: Router
  ) {}
  //
  ngOnInit() {
    this.initForm();
    this.store.dispatch(this.postsActions.getAllEntities()());
    this.posts = this.store.select(this.postsSelectors.getEntities());
    this.patchDataForm();

    //
    this.stateApp$ = this.store.select(this.personnelsSelectors.getStateApp());
    this.store.select(this.personnelsSelectors.getNotification()).subscribe({
      next: (data) => (this.notification = data),
    });
    this.store.select(this.personnelsSelectors.getError()).subscribe({
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
    //  const heure = new FormControl();
    this.formPersonnel = this.formBuilder.group({
      nom: [null, [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      prenom: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: [null, [Validators.required, Validators.email]],
      adresse: [
        null,
        [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')],
      ],
      salaire: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      specialisation: [
        null,
        [Validators.required, Validators.pattern('^[a-zA-Z]*$')],
      ],
      age: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      sexe: [null, [Validators.required, Validators.pattern('^[MF]*$')]],
      telephone: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      poste: [null, [Validators.required]],
      jour: [null, [Validators.required]],
    });
  }
  //
  patchDataForm() {
    this.store.select(this.personnelsSelectors.getEntitieById()).subscribe({
      next: (personnel) => {
        if (personnel) {
          this.personnel = personnel;
          this.formPersonnel.patchValue({
            nom: personnel.nom,
            prenom: personnel.prenom,
            email: personnel.email,
            age: personnel.age,
            sexe: personnel.sexe,
            adresse: personnel.adresse,
            telephone: personnel.telephone,
            poste: personnel.profil,
            jour: personnel.jour,
            salaire: personnel.salaire,
            specialisation: personnel.specialisation
              ? personnel.specialisation
              : '',
          });
        }
      },
      error: (error) => {
        this.store.dispatch(this.personnelsActions.errorEntitie()({ error }));
      },
    });
  }

  submitForm() {
    const formPersonnel = this.formPersonnel.value;
    const jour: string = formPersonnel.jour;
    const listJour: string[] = jour.toString().split(',');
    const newPersonnel: Personnel = {
      id: this.personnel.id,
      nom: formPersonnel.nom,
      prenom: formPersonnel.prenom,
      adresse: formPersonnel.adresse,
      email: formPersonnel.email,
      age: formPersonnel.age,
      sexe: formPersonnel.sexe,
      telephone: formPersonnel.telephone,
      salaire: formPersonnel.salaire,
      specialisation: formPersonnel.specialisation
        ? formPersonnel.specialisation
        : '',
      mdp: this.personnel.mdp,
      profil: formPersonnel.poste,
      jour: listJour,
      Poste: this.personnel.Poste,
    };
    this.store.dispatch(
      this.personnelsActions.updEntitie()({ entitie: newPersonnel })
    );
  }

  //
  treatmentSub(data: IEntitiesEmit) {
    if (
      data.nameModel == NameModels.personnel &&
      data.nameAction == EntitiesActionsTypes.updEntitieSuccess
    ) {
      this.router.navigate([
        `/${this.routesName.mPersonnel.personnels}/${this.routesName.mPersonnel.personnelsDetails}/`,
        this.personnel.id,
      ]);
    }
  }
}
