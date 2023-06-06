import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import {
  PostesActions,
  PostesSelectors,
} from 'src/app/confi-clinique/ngrx/ngrxPoste/Postes.ngrx';
import { Personnel, Poste } from 'src/app/core/models/Models';
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
import { LoginService } from '../login.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  readonly routesName = RoutesNames;

  notification: string[] = [];
  errorMessage: string[] = [];
  //
  formPersonnel!: FormGroup;
  posts: Observable<Poste[]> = new Observable<Poste[]>();
  panelOpenState = false;
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
    private personnelsSelectors: PersonnelsSelectors,
    private postsActions: PostesActions,
    private postsSelectors: PostesSelectors,
    private router: Router,
    private loginService: LoginService
  ) {}
  //
  ngOnInit() {
    this.initForm();
    this.store.dispatch(this.postsActions.getAllEntities()());
    this.posts = this.store.select(this.postsSelectors.getEntities());

    //
    this.stateApp$ = this.store.select(this.personnelsSelectors.getStateApp());
    this.store.select(this.personnelsSelectors.getNotification()).subscribe({
      next: (data) => (this.notification = data),
    });
    this.store.select(this.personnelsSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });

    EntitiesEmit.entitiesSub.pipe(take(1)).subscribe({
      next: (data: IEntitiesEmit) => {
        this.treatmentSub(data);
      },
    });
  }
  //
  initForm() {
    this.formPersonnel = this.formBuilder.group({
      nom: [null, [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      prenom: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: [null, [Validators.required, Validators.email]],
      adresse: [
        null,
        [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')],
      ],
      age: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      sexe: [null, [Validators.required, Validators.pattern('^[MF]*$')]],
      telephone: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      salaire: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      specialisation: [
        null,
        [Validators.required, Validators.pattern('^[a-zA-Z]*$')],
      ],
      mdp: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]],
     poste: [null, [Validators.required]],
      jour: [null, [Validators.required]],
    });
  }

  submitForm() {
    const formPersonnel = this.formPersonnel.value;
    const jour: string = formPersonnel.jour;
    const listJour: string[] = jour.toString().split(',');
    const newPersonnel: Personnel = {
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
      mdp: formPersonnel.mdp,
      profil: formPersonnel.poste,
      jour: listJour,
    };

    this.store.dispatch(
      this.personnelsActions.signUpEntitie()({ entitie: newPersonnel })
    );
  }

  //
  treatmentSub(data: IEntitiesEmit) {
    if (
      data.nameModel == NameModels.personnel &&
      data.nameAction == EntitiesActionsTypes.signUpEntitieSuccess
    ) {
      this.router.navigate([`/${this.routesName.mLogin.login}`]);
    }
  }
}
