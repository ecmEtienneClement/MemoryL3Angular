import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Tache } from 'src/app/core/models/Models';
import { StateApp } from 'src/app/core/ngrx/Entities.state';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import { TachesActions, TachesSelectors } from '../ngrx/ngrxTache/Tache.ngrx';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.scss'],
})
export class TachesComponent implements OnInit, AfterViewInit {
  tache: Observable<Tache[]> = new Observable<Tache[]>();
  readonly routesName = RoutesNames;
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  notification: string[] = [];
  errorMessage: string[] = [];
  displayedColumns: string[] = [
    'Numero',
    'Date',
    'perfusion',
    'prelevement',
    'prisMedicament',
    ' ',
    '  ',
  ];
  dataSource!: MatTableDataSource<Tache>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store: Store,
    private tacheActions: TachesActions,
    private tacheSelectors: TachesSelectors
  ) {}
  ngOnInit(): void {
    this.store.dispatch(this.tacheActions.getAllEntities()());
    this.store.select(this.tacheSelectors.getEntities()).subscribe({
      next: (data) => {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(data);
      },
    });

    //
    this.stateApp$ = this.store.select(this.tacheSelectors.getStateApp());
    this.store.select(this.tacheSelectors.getNotification()).subscribe({
      next: (data) => (this.notification = data),
    });
    this.store.select(this.tacheSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });
  }
  //
  deleteTache(tache: Tache) {
    this.store.dispatch(this.tacheActions.delEntitie()({ entitie: tache }));
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

/** Builds and returns a new User. */
