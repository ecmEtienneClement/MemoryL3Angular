import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Personnel } from 'src/app/core/models/Models';
import { StateApp } from 'src/app/core/ngrx/Entities.state';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import { PersonnelsActions, PersonnelsSelectors } from './ngrx/Personnels.ngrx';

@Component({
  selector: 'app-personnels',
  templateUrl: './personnels.component.html',
  styleUrls: ['./personnels.component.scss'],
})
export class PersonnelsComponent implements OnInit {
  personnels$: Observable<Personnel[]> = new Observable<Personnel[]>();
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  readonly routesName = RoutesNames;
  notification: string[] = [];
  errorMessage: string[] = [];
  constructor(
    private store: Store,
    private personnelsActions: PersonnelsActions,
    private personnelsSelectors: PersonnelsSelectors
  ) {}
  ngOnInit(): void {
    this.store.dispatch(this.personnelsActions.getAllEntities()());
    this.personnels$ = this.store.select(
      this.personnelsSelectors.getEntities()
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

  //
  deletePersonnel(personnel: Personnel) {
    this.store.dispatch(
      this.personnelsActions.delEntitie()({ entitie: personnel })
    );
  }
}
