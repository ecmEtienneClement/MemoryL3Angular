import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  PostesActions,
  PostesSelectors,
} from 'src/app/confi-clinique/ngrx/ngrxPoste/Postes.ngrx';
import { Personnel, Poste } from 'src/models/Models';
import { AppState } from 'src/ngrx/Entities.state';
import { PersonnelsActions } from '../ngrx/Personnels.ngrx';

@Component({
  selector: 'app-personnels-add',
  templateUrl: './personnels-add.component.html',
  styleUrls: ['./personnels-add.component.scss'],
})
export class PersonnelsAddComponent implements OnInit {
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
    private postsActions: PostesActions,
    private postsSelectors: PostesSelectors
  ) {}
  //
  ngOnInit() {
    this.initForm();
    this.store.dispatch(this.postsActions.getAllEntities()());
    this.posts = this.store.select(this.postsSelectors.getEntities());
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
}
