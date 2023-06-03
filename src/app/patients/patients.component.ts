import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/core/models/Models';
import { StateApp } from 'src/app/core/ngrx/Entities.state';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import { PatientsActions, PatientsSelectors } from './ngrx/Patients.ngrx';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  patients: Observable<Patient[]> = new Observable<Patient[]>();
  readonly routesName = RoutesNames;
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  notification: string[] = [];
  errorMessage: string[] = [];
 
  displayedColumns: string[] = ['Nom',	'Prenon',	'Age',	'Sexe',	'Telephone'	,' ','  '];
    dataSource!: MatTableDataSource<Patient>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private store: Store,
    private patientsActions: PatientsActions,
    private patientsSelectors: PatientsSelectors
  ) {}
  ngOnInit(): void {
    this.store.dispatch(this.patientsActions.getAllEntities()());
    this.store.select(this.patientsSelectors.getEntities()).subscribe({
      next: (data) => {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(data);
      },
    });

    //
    this.stateApp$ = this.store.select(this.patientsSelectors.getStateApp());
    this.store.select(this.patientsSelectors.getNotification()).subscribe({
      next: (data) => (this.notification = data),
    });
    this.store.select(this.patientsSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });
  }

  //
  deletePatient(patient: Patient) {
    this.store.dispatch(
      this.patientsActions.delEntitie()({ entitie: patient })
    );
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
