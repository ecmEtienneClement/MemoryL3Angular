import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RendezVous } from 'src/app/core/models/Models';
import { AppState, StateApp } from 'src/app/core/ngrx/Entities.state';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import {
  RendezVoussActions,
  RendezVoussSelectors,
} from 'src/app/patients/ngrx/ngrxRendezVous/RendezVous.ngrx';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.scss'],
})
export class RendezVousComponent implements OnInit {
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  notification: string[] = [];
  errorMessage: string[] = [];
  //
  readonly routesName = RoutesNames;
  displayedColumns: string[] = [
    'Date',
    'Secretaire',
    'DossierPatient',
    'Motif',
    'Type Rendez-Vous',
  ];

  dataSource!: MatTableDataSource<RendezVous>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store: Store<AppState>,
    private rendezVoussActions: RendezVoussActions,
    private rendezVoussSelectors: RendezVoussSelectors
  ) {}
  //
  ngOnInit() {
    this.store.dispatch(this.rendezVoussActions.getAllEntities()());

    this.store.select(this.rendezVoussSelectors.getEntities()).subscribe({
      next: (data) => {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(data);
      },
    });
    //
    this.stateApp$ = this.store.select(this.rendezVoussSelectors.getStateApp());
    this.store.select(this.rendezVoussSelectors.getNotification()).subscribe({
      next: (data) => (this.notification = data),
    });
    this.store.select(this.rendezVoussSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });
  }

  //
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
