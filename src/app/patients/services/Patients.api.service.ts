import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesDataAPI } from 'src/app/core/serviceEntities/EntitiesDataAPI';

@Injectable({ providedIn: 'root' })
export class PatientApiService extends EntitiesDataAPI<Patient> {
  constructor(httpClient: HttpClient) {
    super(httpClient, NameModels.patient);
  }
}
