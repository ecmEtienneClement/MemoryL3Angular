import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Personnel } from 'src/models/Models';
import { AppState } from 'src/ngrx/Entities.state';
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

  constructor(
    private store: Store<AppState>,
    private personnelsSelectores: PersonnelsSelectors
  ) {}
  ngOnInit(): void {
    this.personnel$ = <Observable<Personnel>>(
      this.store.select(this.personnelsSelectores.getEntitieById())
    );
  }
}
