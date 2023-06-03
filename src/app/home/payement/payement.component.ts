import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Payement } from 'src/app/core/models/Models';
import { AppState, StateApp } from 'src/app/core/ngrx/Entities.state';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import {
  PayementsActions,
  PayementsSelectors,
} from 'src/app/patients/ngrx/ngrxPayement/Payement.ngrx';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.scss'],
})
export class PayementComponent implements OnInit {
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  notification: string[] = [];
  errorMessage: string[] = [];
  //
  readonly routesName = RoutesNames;

  displayedColumns: string[] = [
    'Montant',
    'Secretaire',
    'DossierPatient',
    'Description',
  ];

  dataSource!: MatTableDataSource<Payement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //
  constructor(
    private store: Store<AppState>,
    private payementsActions: PayementsActions,
    private payementsSelectors: PayementsSelectors
  ) {}

  //
  ngOnInit() {
    this.store.dispatch(this.payementsActions.getAllEntities()());

    this.store.select(this.payementsSelectors.getEntities()).subscribe({
      next: (data) => {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(data);
      },
    });
    //
    this.stateApp$ = this.store.select(this.payementsSelectors.getStateApp());
    this.store.select(this.payementsSelectors.getNotification()).subscribe({
      next: (data) => (this.notification = data),
    });
    this.store.select(this.payementsSelectors.getError()).subscribe({
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
