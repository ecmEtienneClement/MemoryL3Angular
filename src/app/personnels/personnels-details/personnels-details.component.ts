import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Personnel } from 'src/models/Models';
import { AppState, StateApp } from 'src/ngrx/Entities.state';
import { RoutesNames } from 'src/routes/routes.config';
import { PersonnelsSelectors } from '../ngrx/Personnels.ngrx';

@Component({
  selector: 'app-personnels-details',
  templateUrl: './personnels-details.component.html',
  styleUrls: ['./personnels-details.component.scss'],
})
export class PersonnelsDetailsComponent implements OnInit {
  personnel$: Observable<Personnel> = new Observable();
  readonly routesName = RoutesNames;
  stateApp$: Observable<StateApp> = new Observable<StateApp>();

  notification: string[] = [];
  errorMessage: string[] = [];
  constructor(
    private store: Store<AppState>,
    private personnelsSelectors: PersonnelsSelectors
  ) {}
  ngOnInit(): void {
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
