import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  displayedColumns: string[] = [
    'Nom',
    'Prenon',
    'Age',
    'Sexe',
    'Telephone',
    ' ',
    '  ',
  ];
  dataSource!: MatTableDataSource<Personnel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private store: Store,
    private personnelsActions: PersonnelsActions,
    private personnelsSelectors: PersonnelsSelectors
  ) {}
  ngOnInit(): void {
    this.store.dispatch(this.personnelsActions.getAllEntities()());
    this.store.select(this.personnelsSelectors.getEntities()).subscribe({
      next: (data) => {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(data);
      },
    });
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
