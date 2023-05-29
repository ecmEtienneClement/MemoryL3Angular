import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {  Observable } from 'rxjs';
import { DossierPatient } from 'src/app/core/models/Models';
import { AppState, StateApp } from 'src/app/core/ngrx/Entities.state';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import {
  DossierPatientsActions,
  DossierPatientsSelectors,
} from '../../ngrx/ngrxDossierPatient/DossierPatient.ngrx';

@Component({
  selector: 'app-dossier-patient',
  templateUrl: './dossier-patient.component.html',
  styleUrls: ['./dossier-patient.component.scss'],
})
export class DossierPatientComponent {
  panelOpenState = false ;
}
