import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  Antecedent,
  Consultation,
  DossierPatient,
  Ordonnance,
  Payement,
  RendezVous,
} from 'src/app/core/models/Models';
import { AppState, StateApp } from 'src/app/core/ngrx/Entities.state';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import {
  AntecedentsActions,
  AntecedentsSelectors,
} from '../../ngrx/ngrxAntecedent/Antecedent.ngrx';
import {
  ConsultationsActions,
  ConsultationsSelectors,
} from '../../ngrx/ngrxConsultation/Consultation.ngrx';

import {
  DossierPatientsActions,
  DossierPatientsSelectors,
} from '../../ngrx/ngrxDossierPatient/DossierPatient.ngrx';
import {
  OrdonnancesActions,
  OrdonnancesSelectors,
} from '../../ngrx/ngrxOrdonnance/Ordonnance.ngrx';
import {
  PayementsActions,
  PayementsSelectors,
} from '../../ngrx/ngrxPayement/Payement.ngrx';
import {
  RendezVoussActions,
  RendezVoussSelectors,
} from '../../ngrx/ngrxRendezVous/RendezVous.ngrx';

@Component({
  selector: 'app-dossier-patient-details',
  templateUrl: './dossier-patient-details.component.html',
  styleUrls: ['./dossier-patient-details.component.scss'],
})
export class DossierPatientDetailsComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  dossierPatient: DossierPatient = {
    histoire: [],
    motif: [],
    numeroDossier: '',
    patient: '',
    personnel: [],
    salle: '',
    terrain: [],
  };
  dossierPatient$: Observable<DossierPatient> =
    new Observable<DossierPatient>();
  consultations: Consultation[] = [];
  consultationsId: any[] = [];
  antecedents: Antecedent[] = [];
  antecedentsId: any[] = [];
  ordonnances: Ordonnance[] = [];
  ordonnancesId: any[] = [];
  payements: Payement[] = [];
  payementsId: any[] = [];
  rendezVous: RendezVous[] = [];
  rendezVousId: any[] = [];
  stateApp$: Observable<StateApp> = new Observable<StateApp>();
  notification: string[] = [];
  errorMessage: string[] = [];
  panelOpenState = false;

  //
  readonly routesName = RoutesNames;
  idPatient: string = '';
  constructor(
    private store: Store<AppState>,
    private dossierPatientsActions: DossierPatientsActions,
    private dossierPatientsSelectors: DossierPatientsSelectors,
    private consultationActions: ConsultationsActions,
    private consultationsSelectors: ConsultationsSelectors,
    private antecedentsActions: AntecedentsActions,
    private antecedentsSelectors: AntecedentsSelectors,
    private ordonnancesActions: OrdonnancesActions,
    private ordonnancesSelectors: OrdonnancesSelectors,
    private payementsActions: PayementsActions,
    private payementsSelectors: PayementsSelectors,
    private rendezVoussActions: RendezVoussActions,
    private rendezVoussSelectors: RendezVoussSelectors
  ) {}

  //
  ngOnInit() {
    this.idPatient = <string>localStorage.getItem('idPatient');
    this.store.dispatch(this.dossierPatientsActions.getAllEntities()());
    this.store.dispatch(this.consultationActions.getAllEntities()());
    this.store.dispatch(this.antecedentsActions.getAllEntities()());
    this.store.dispatch(this.ordonnancesActions.getAllEntities()());
    this.store.dispatch(this.payementsActions.getAllEntities()());
    this.store.dispatch(this.rendezVoussActions.getAllEntities()());

    this.dossierPatient$ = <Observable<DossierPatient>>(
      this.store.select(this.dossierPatientsSelectors.getEntitieById())
    );
    //getTbDetails
    this.getTbDetails();
  }

  getTbDetails() {
    this.sub.add(
      this.store
        .select(this.dossierPatientsSelectors.getEntitieById())
        .subscribe({
          next: (dossiers) => {
            //Consultation
            this.sub.add(
              this.store
                .select(this.consultationsSelectors.getEntities())
                .subscribe({
                  next: (consul) => {
                    if (consul) {
                      consul.forEach((item) => {
                        if (item.dossierPatient == dossiers?.id) {
                          if (!this.consultationsId.includes(item?.id)) {
                            this.consultations.push(item);
                            this.consultationsId.push(item?.id);
                          }
                        }
                      });
                    }
                  },
                })
            );

            //Antecedent
            this.sub.add(
              this.store
                .select(this.antecedentsSelectors.getEntities())
                .subscribe({
                  next: (antece) => {
                    if (antece) {
                      antece.forEach((item) => {
                        if (item.dossierPatient == dossiers?.id) {
                          if (!this.antecedentsId.includes(item?.id)) {
                            this.antecedents.push(item);
                            this.antecedentsId.push(item?.id);
                          }
                        }
                      });
                    }
                  },
                })
            );

            //Ordonnance
            this.sub.add(
              this.store
                .select(this.ordonnancesSelectors.getEntities())
                .subscribe({
                  next: (ordon) => {
                    if (ordon) {
                      ordon.forEach((item) => {
                        if (item.dossierPatient == dossiers?.id) {
                          if (!this.ordonnancesId.includes(item?.id)) {
                            this.ordonnances.push(item);
                            this.ordonnancesId.push(item?.id);
                          }
                        }
                      });
                    }
                  },
                })
            );

            //Payement
            this.sub.add(
              this.store
                .select(this.payementsSelectors.getEntities())
                .subscribe({
                  next: (paye) => {
                    if (paye) {
                      paye.forEach((item) => {
                        if (item.dossierPatient == dossiers?.id) {
                          if (!this.payementsId.includes(item?.id)) {
                            this.payements.push(item);
                            this.payementsId.push(item?.id);
                          }
                        }
                      });
                    }
                  },
                })
            );

            //RV
            this.sub.add(
              this.store
                .select(this.rendezVoussSelectors.getEntities())
                .subscribe({
                  next: (rv) => {
                    if (rv) {
                      rv.forEach((item) => {
                        if (item.dossierPatient == dossiers?.id) {
                          if (!this.rendezVousId.includes(item?.id)) {
                            this.rendezVous.push(item);
                            this.rendezVousId.push(item?.id);
                          }
                        }
                      });
                    }
                  },
                })
            );
          },
        })
    );
  }
  //
  deleteConsultation(consultation: Consultation) {
    //
    this.stateApp$ = this.store.select(
      this.consultationsSelectors.getStateApp()
    );

    this.store.select(this.consultationsSelectors.getNotification()).subscribe({
      next: (data) => {
        this.notification = data;
        setTimeout(() => {
          this.ngOnInit();
        }, 3000);
      },
    });
    this.store.select(this.consultationsSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });
    this.store.dispatch(
      this.consultationActions.delEntitie()({ entitie: consultation })
    );
  }
  deleteAntecedent(antecedent: Antecedent) {
    //
    this.stateApp$ = this.store.select(this.antecedentsSelectors.getStateApp());

    this.store.select(this.antecedentsSelectors.getNotification()).subscribe({
      next: (data) => {
        this.notification = data;
        setTimeout(() => {
          this.ngOnInit();
        }, 3000);
      },
    });
    this.store.select(this.antecedentsSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });
    this.store.dispatch(
      this.antecedentsActions.delEntitie()({ entitie: antecedent })
    );
  }
  deleteOrdonnance(ordonnance: Ordonnance) {
    //
    this.stateApp$ = this.store.select(this.ordonnancesSelectors.getStateApp());

    this.store.select(this.ordonnancesSelectors.getNotification()).subscribe({
      next: (data) => {
        this.notification = data;
        setTimeout(() => {
          this.ngOnInit();
        }, 3000);
      },
    });
    this.store.select(this.ordonnancesSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });
    this.store.dispatch(
      this.ordonnancesActions.delEntitie()({ entitie: ordonnance })
    );
  }
  deleteRv(rv: RendezVous) {
    //
    this.stateApp$ = this.store.select(this.rendezVoussSelectors.getStateApp());

    this.store.select(this.rendezVoussSelectors.getNotification()).subscribe({
      next: (data) => {
        this.notification = data;
        setTimeout(() => {
          this.ngOnInit();
        }, 3000);
      },
    });
    this.store.select(this.rendezVoussSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });
    this.store.dispatch(this.rendezVoussActions.delEntitie()({ entitie: rv }));
  }
  //
  deletePayement(payement: Payement) {
    //
    this.stateApp$ = this.store.select(this.payementsSelectors.getStateApp());

    this.store.select(this.payementsSelectors.getNotification()).subscribe({
      next: (data) => {
        this.notification = data;
        setTimeout(() => {
          this.ngOnInit();
        }, 3000);
      },
    });
    this.store.select(this.payementsSelectors.getError()).subscribe({
      next: (data) => (this.errorMessage = data),
    });
    this.store.dispatch(
      this.payementsActions.delEntitie()({ entitie: payement })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
