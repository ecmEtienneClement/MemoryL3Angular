import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from 'src/models/Models';
import { NameModels } from 'src/models/NameModels';
import { EntitiesDataAPI } from 'src/serviceEntities/EntitiesDataAPI';

@Injectable({ providedIn: 'root' })
export class PatientApiService extends EntitiesDataAPI<Patient> {
  constructor(httpClient: HttpClient) {
    super(httpClient, NameModels.patient);
  }
}
