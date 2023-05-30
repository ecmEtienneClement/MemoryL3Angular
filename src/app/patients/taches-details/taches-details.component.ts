import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Patient, Tache } from 'src/app/core/models/Models';
import { AppState, StateApp } from 'src/app/core/ngrx/Entities.state';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import { TachesSelectors } from '../ngrx/ngrxTache/Tache.ngrx';
import { PatientsActions, PatientsSelectors } from '../ngrx/Patients.ngrx';

@Component({
  selector: 'app-taches-details',
  templateUrl: './taches-details.component.html',
  styleUrls: ['./taches-details.component.scss'],
})
export class TachesDetailsComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  tache!:Tache ;
  patients: Patient[] = [];
  patientsPerfu: Patient[] = [];
  patientsPerfuId: string[] = [];
  patientsprele: Patient[] = [];
  patientspreleId: string[] = [];
  patientspriseMe: Patient[] = [];
  patientspriseMeId: string[] = [];

  readonly routesName = RoutesNames;
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  notification: string[] = [];
  errorMessage: string[] = [];

  panelOpenState = false;

  displayedColumns: string[] = ['Nom', 'Prenon', 'Age', 'Sexe', 'Telephone'];
  dataSource!: MatTableDataSource<Patient>;
  dataSourcePrele!: MatTableDataSource<Patient>;
  dataSourcePrise!: MatTableDataSource<Patient>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private store: Store<AppState>,
    private tachesSelectors: TachesSelectors,
    private patientsActions: PatientsActions,
    private patientsSelectors: PatientsSelectors
  ) {}

  ngOnInit(): void {
    this.store.dispatch(this.patientsActions.getAllEntities()());
    //Pour id du patient dans le local
    this.sub.add(
      this.store.select(this.patientsSelectors.getEntities()).subscribe({
        next: (data) => {
          if (data) {
            this.patients = data;

            this.customePatientsTache();
          }
        },
      })
    );

    //
    this.stateApp$ = this.store.select(this.patientsSelectors.getStateApp());
    this.store.select(this.patientsSelectors.getNotification()).subscribe({
      next: (data) => (this.notification = data),
    });
    this.store.select(this.patientsSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });
  }
  customePatientsTache() {
    //Pour id du patient dans le local
    this.sub.add(
      this.store.select(this.tachesSelectors.getEntitieById()).subscribe({
        next: (data) => {
          if (data) {
            this.tache= data
            //Perfusion
            data.perfusion.forEach((idPerfu) => {
              this.patients.forEach((patient) => {
                if (idPerfu == patient.id) {
                  if (!this.patientsPerfuId.includes(patient.id)) {
                    this.patientsPerfuId.push(patient.id);
                    this.patientsPerfu.push(patient);
                  }
                }
              });
            });
            //prelevement
            data.prelevement.forEach((idPrele) => {
              this.patients.forEach((patient) => {
                if (idPrele == patient.id) {
                  if (!this.patientspreleId.includes(patient.id)) {
                    this.patientsprele.push(patient);
                    this.patientspreleId.push(patient.id);
                  }
                }
              });
            });

            //patientspriseMe
            data.prisMedicament.forEach((idPrise) => {
              this.patients.forEach((patient) => {
                if (idPrise == patient.id) {
                  if (!this.patientspriseMeId.includes(patient.id)) {
                    this.patientspriseMe.push(patient);
                    this.patientspriseMeId.push(patient.id);
                  }
                }
              });
            });
            this.dataSource = new MatTableDataSource(this.patientsPerfu);
            this.dataSourcePrele = new MatTableDataSource(this.patientsprele);
            this.dataSourcePrise = new MatTableDataSource(this.patientspriseMe);
          }
        },
      })
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
  ///
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
