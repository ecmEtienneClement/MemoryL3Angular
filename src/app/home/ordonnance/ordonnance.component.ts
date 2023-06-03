import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ordonnance } from 'src/app/core/models/Models';
import { AppState, StateApp } from 'src/app/core/ngrx/Entities.state';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import {
  OrdonnancesActions,
  OrdonnancesSelectors,
} from 'src/app/patients/ngrx/ngrxOrdonnance/Ordonnance.ngrx';

@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.scss'],
})
export class OrdonnanceComponent implements OnInit {
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  notification: string[] = [];
  errorMessage: string[] = [];
  //
  readonly routesName = RoutesNames;

  displayedColumns: string[] = ['Ordonnance', 'Medecin', 'DossierPatient'];

  dataSource!: MatTableDataSource<Ordonnance>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private store: Store<AppState>,
    private ordonnancesActions: OrdonnancesActions,
    private ordonnancesSelectors: OrdonnancesSelectors
  ) {}

  //
  ngOnInit() {
    this.store.dispatch(this.ordonnancesActions.getAllEntities()());

    this.store.select(this.ordonnancesSelectors.getEntities()).subscribe({
      next: (data) => {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(data);
      },
    });
    //
    this.stateApp$ = this.store.select(this.ordonnancesSelectors.getStateApp());
    this.store.select(this.ordonnancesSelectors.getNotification()).subscribe({
      next: (data) => (this.notification = data),
    });
    this.store.select(this.ordonnancesSelectors.getError()).subscribe({
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
