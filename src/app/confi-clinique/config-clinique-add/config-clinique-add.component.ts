import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  InfoClinique,
  Poste,
  Salle,
  TypeDeSalle,
  TypeRendezVous,
} from 'src/app/core/models/Models';
import { AppState } from 'src/app/core/ngrx/Entities.state';
import {
  InfoCliniquesActions,
  InfoCliniquesSelectors,
} from '../ngrx/ngrxInfoClini/InfoClini.ngrx';
import { PostesActions } from '../ngrx/ngrxPoste/Postes.ngrx';
import { SallesActions } from '../ngrx/ngrxSalle/Salles.ngrx';
import { TypeRendezVousActions } from '../ngrx/ngrxTypeRV/TypesRV.ngrx';
import {
  TypeDeSallesActions,
  TypeDeSallesSelectors,
} from '../ngrx/ngrxTypeSalle/TypesSalles.ngrx';

@Component({
  selector: 'app-config-clinique-add',
  templateUrl: './config-clinique-add.component.html',
  styleUrls: ['./config-clinique-add.component.scss'],
})
export class ConfigCliniqueAddComponent implements OnInit {
  formInfoClini!: FormGroup;
  typeDeSalle$: Observable<TypeDeSalle[]> = new Observable();
  nameProfil: string = '';
  numSalle: number = 0;
  typeSalleId: string = '';
  nbrPlaceSalle: number = 0;
  nameTypeDeSalle: string = '';
  nameTypeRV: string = '';
  prixTypeRV: number = 0;
  panelOpenState = false;
  infoClini: InfoClinique = {
    adresse: '',
    email: [],
    nom: '',
    proprietaire: [],
    telephone: [],
  };
  addInfoClini: boolean = true;
  constructor(
    private store: Store<AppState>,
    private posteAtions: PostesActions,
    private sallesActions: SallesActions,
    private typeSalleActions: TypeDeSallesActions,
    private typeDeSallesSelectors: TypeDeSallesSelectors,
    private typeRendezVousActions: TypeRendezVousActions,
    private infoCliniquesActions: InfoCliniquesActions,
    private infoCliniquesSelectors: InfoCliniquesSelectors,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.store.dispatch(this.typeSalleActions.getAllEntities()());
    this.store.dispatch(this.infoCliniquesActions.getAllEntities()());
    this.typeDeSalle$ = this.store.select(
      this.typeDeSallesSelectors.getEntities()
    );
    this.initForm();
    this.patchDataForm();
  }
  //
  initForm() {
    this.formInfoClini = this.formBuilder.group({
      nom: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      proprietaire: [
        null,
        [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
      ],
      email: [null, [Validators.required, Validators.email]],
      adresse: [
        null,
        [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')],
      ],
      telephone: [null, [Validators.required, Validators.pattern('^[0-9 ]*$')]],
    });
  }
  //
  patchDataForm() {
    this.store.select(this.infoCliniquesSelectors.getEntities()).subscribe({
      next: (infoClini) => {
        if (infoClini) {
          if (infoClini.length > 0) {
            this.addInfoClini = false;
            this.formInfoClini.patchValue({
              nom: infoClini[0].nom,
              telephone: infoClini[0].telephone,
              proprietaire: infoClini[0].proprietaire,
              email: infoClini[0].email,
            });
          }
         
        }
      },
      error: (error) => {
        this.store.dispatch(
          this.infoCliniquesActions.errorEntitie()({ error })
        );
      },
    });
  }

  //
  submitForm() {
    const valueForm = this.formInfoClini.value;
    const email: string = valueForm.email;
    const listEmail: string[] = email.toString().split(',');
    const telephone: string = valueForm.telephone;
    const listTelephone: string[] = telephone.toString().split(',');
    const proprietaire: string = valueForm.proprietaire;
    const listProprietaire: string[] = proprietaire.toString().split(',');

    if (this.addInfoClini) {
      const newInfoClinique: InfoClinique = {
        nom: valueForm.nom,
        adresse: valueForm.adresse,
        email: listEmail,
        telephone: listTelephone,
        proprietaire: listProprietaire,
      };
      this.store.dispatch(
        this.infoCliniquesActions.addEntitie()({ entitie: newInfoClinique })
      );
    } else {
      const updInfoClinique: InfoClinique = {
        id: this.infoClini.id,
        nom: valueForm.nom,
        adresse: valueForm.adresse,
        email: listEmail,
        telephone: listTelephone,
        proprietaire: listProprietaire,
      };
      this.store.dispatch(
        this.infoCliniquesActions.updEntitie()({ entitie: updInfoClinique })
      );
    }
  }
  //
  saveProfil() {
    const newProfil: Poste = {
      poste: this.nameProfil,
    };
    this.store.dispatch(this.posteAtions.addEntitie()({ entitie: newProfil }));
  }
  //
  saveSalle() {
    const newSalle: Salle = {
      typeDeSalle: this.typeSalleId,
      numero: this.numSalle,
      place: this.nbrPlaceSalle,
    };
    this.store.dispatch(this.sallesActions.addEntitie()({ entitie: newSalle }));
  }
  //
  saveTypeSalle() {
    const newTypeSalle: TypeDeSalle = {
      type: this.nameTypeDeSalle,
    };
    this.store.dispatch(
      this.typeSalleActions.addEntitie()({ entitie: newTypeSalle })
    );
  }
  //
  saveTypeRV() {
    const newTypeRV: TypeRendezVous = {
      type: this.nameTypeRV,
      prix: this.prixTypeRV,
    };
    this.store.dispatch(
      this.typeRendezVousActions.addEntitie()({ entitie: newTypeRV })
    );
  }
}
