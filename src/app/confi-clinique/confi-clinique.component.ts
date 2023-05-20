import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  InfoClinique,
  Poste,
  Salle,
  TypeDeSalle,
  TypeRendezVous,
} from 'src/models/Models';
import { AppState, StateApp } from 'src/ngrx/Entities.state';
import { RoutesNames } from 'src/routes/routes.config';
import {
  InfoCliniquesActions,
  InfoCliniquesSelectors,
} from './ngrx/ngrxInfoClini/InfoClini.ngrx';
import { PostesActions, PostesSelectors } from './ngrx/ngrxPoste/Postes.ngrx';
import { SallesActions, SallesSelectors } from './ngrx/ngrxSalle/Salles.ngrx';
import {
  TypeRendezVousActions,
  TypeRendezVousSelectors,
} from './ngrx/ngrxTypeRV/TypesRV.ngrx';
import {
  TypeDeSallesActions,
  TypeDeSallesSelectors,
} from './ngrx/ngrxTypeSalle/TypesSalles.ngrx';

@Component({
  selector: 'app-confi-clinique',
  templateUrl: './confi-clinique.component.html',
  styleUrls: ['./confi-clinique.component.scss'],
})
export class ConfiCliniqueComponent implements OnInit {
  postes$: Observable<Poste[]> = new Observable();
  salles$: Observable<Salle[]> = new Observable();
  typeSalles$: Observable<TypeDeSalle[]> = new Observable();
  typeRV$: Observable<TypeRendezVous[]> = new Observable();
  infoClini$: Observable<InfoClinique[]> = new Observable();
  panelOpenState = false;
  readonly routesName = RoutesNames;
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  notification: string[] = [];
  errorMessage: string[] = [];
  constructor(
    private store: Store<AppState>,
    private posteAtions: PostesActions,
    private posteSelectores: PostesSelectors,
    private sallesActions: SallesActions,
    private salleSelectores: SallesSelectors,
    private typeSalleActions: TypeDeSallesActions,
    private typeDeSallesSelectors: TypeDeSallesSelectors,
    private typeRendezVousActions: TypeRendezVousActions,
    private typeRendezVousSelectors: TypeRendezVousSelectors,
    private infoCliniquesActions: InfoCliniquesActions,
    private infoCliniquesSelectors: InfoCliniquesSelectors
  ) {}
  ngOnInit(): void {
    this.store.dispatch(this.posteAtions.getAllEntities()());
    this.store.dispatch(this.sallesActions.getAllEntities()());
    this.store.dispatch(this.typeSalleActions.getAllEntities()());
    this.store.dispatch(this.typeRendezVousActions.getAllEntities()());
    this.store.dispatch(this.infoCliniquesActions.getAllEntities()());
    this.postes$ = this.store.select(this.posteSelectores.getEntities());
    this.salles$ = this.store.select(this.salleSelectores.getEntities());
    this.typeSalles$ = this.store.select(
      this.typeDeSallesSelectors.getEntities()
    );
    this.typeRV$ = this.store.select(
      this.typeRendezVousSelectors.getEntities()
    );
    this.infoClini$ = this.store.select(
      this.infoCliniquesSelectors.getEntities()
    );

    //
    this.stateApp$ = this.store.select(
      this.typeDeSallesSelectors.getStateApp()
    );
    this.store.select(this.typeDeSallesSelectors.getNotification()).subscribe({
      next: (data) => (this.notification = data),
    });
    this.store.select(this.typeDeSallesSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });
  }

  //
  deleteProfil(profil: Poste) {
    this.store.dispatch(this.posteAtions.delEntitie()({ entitie: profil }));
  }
  //
  deleteSalle(salle: Salle) {
    this.store.dispatch(this.sallesActions.delEntitie()({ entitie: salle }));
  }
  //
  deleteTypeSalle(typeSalle: TypeDeSalle) {
    this.store.dispatch(
      this.typeSalleActions.delEntitie()({ entitie: typeSalle })
    );
  }
  //
  deleteTypeRV(typeRV: TypeRendezVous) {
    this.store.dispatch(
      this.typeRendezVousActions.delEntitie()({ entitie: typeRV })
    );
  }
}
