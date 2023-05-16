import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Personnel } from 'src/models/Models';
import { RoutesNames } from 'src/routes/routes.config';
import { PersonnelsActions, PersonnelsSelectors } from './ngrx/Personnels.ngrx';

@Component({
  selector: 'app-personnels',
  templateUrl: './personnels.component.html',
  styleUrls: ['./personnels.component.scss'],
})
export class PersonnelsComponent implements OnInit {
  personnels: Observable<Personnel[]> = new Observable<Personnel[]>();
  readonly routesName = RoutesNames;

  constructor(
    private store: Store,
    private personnelsActions: PersonnelsActions,
    private personnelsSelectors: PersonnelsSelectors
  ) {}
  ngOnInit(): void {
    this.store.dispatch(this.personnelsActions.getAllEntities()());
    this.personnels = this.store.select(this.personnelsSelectors.getEntities());
  }

  //
  deletePersonnel(personnel: Personnel) {
    this.store.dispatch(
      this.personnelsActions.delEntitie()({ entitie: personnel })
    );
  }
}
