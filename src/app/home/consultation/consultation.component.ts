import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Consultation } from 'src/app/core/models/Models';
import { AppState, StateApp } from 'src/app/core/ngrx/Entities.state';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import {
  ConsultationsActions,
  ConsultationsSelectors,
} from 'src/app/patients/ngrx/ngrxConsultation/Consultation.ngrx';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
})
export class ConsultationComponent implements OnInit {
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  notification: string[] = [];
  errorMessage: string[] = [];
  readonly routesName = RoutesNames;

  displayedColumns: string[] = ['Date', 'Poids', 'Taille', 'Temperature'];

  dataSource!: MatTableDataSource<Consultation>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //
  constructor(
    private store: Store<AppState>,
    private consultationActions: ConsultationsActions,
    private consultationsSelectors: ConsultationsSelectors
  ) {}

  //
  ngOnInit() {
    this.store.dispatch(this.consultationActions.getAllEntities()());

    this.store.select(this.consultationsSelectors.getEntities()).subscribe({
      next: (data) => {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(data);
      },
    });
    //
    this.stateApp$ = this.store.select(
      this.consultationsSelectors.getStateApp()
    );
    this.store.select(this.consultationsSelectors.getNotification()).subscribe({
      next: (data) => (this.notification = data),
    });
    this.store.select(this.consultationsSelectors.getError()).subscribe({
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
