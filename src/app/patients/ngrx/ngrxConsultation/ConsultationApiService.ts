import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consultation } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesDataAPI } from 'src/app/core/serviceEntities/EntitiesDataAPI';

@Injectable({ providedIn: 'root' })
export class ConsultationApiService extends EntitiesDataAPI<Consultation> {
  constructor(httpClient: HttpClient) {
    super(httpClient, NameModels.consultation);
  }
}
