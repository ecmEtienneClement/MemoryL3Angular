import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Personnel } from 'src/app/core/models/Models';
import { AppState, StateApp } from 'src/app/core/ngrx/Entities.state';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import {
  PersonnelsActions,
  PersonnelsSelectors,
} from '../ngrx/Personnels.ngrx';

@Component({
  selector: 'app-personnels-dossier-personnel',
  templateUrl: './personnels-dossier-personnel.component.html',
  styleUrls: ['./personnels-dossier-personnel.component.scss'],
})
export class PersonnelsDossierPersonnelComponent implements OnInit {
  personnel$: Observable<Personnel> = new Observable();
  readonly routesName = RoutesNames;
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  panelOpenState = false;
  notification: string[] = [];
  errorMessage: string[] = [];
  constructor(
    private store: Store<AppState>,
    private personnelsSelectors: PersonnelsSelectors,
    private personnelsActions: PersonnelsActions
  ) {}
  ngOnInit(): void {
    this.store.dispatch(this.personnelsActions.getAllEntities()());

    this.personnel$ = <Observable<Personnel>>(
      this.store.select(this.personnelsSelectors.getEntitieById())
    );

    //
    this.stateApp$ = this.store.select(this.personnelsSelectors.getStateApp());
    this.store.select(this.personnelsSelectors.getNotification()).subscribe({
      next: (data) => (this.notification = data),
    });
    this.store.select(this.personnelsSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });
  }
}
