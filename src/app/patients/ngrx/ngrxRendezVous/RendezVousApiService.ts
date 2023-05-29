import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RendezVous } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesDataAPI } from 'src/app/core/serviceEntities/EntitiesDataAPI';

@Injectable({ providedIn: 'root' })
export class RendezVousApiService extends EntitiesDataAPI<RendezVous> {
  constructor(httpClient: HttpClient) {
    super(httpClient, NameModels.rendezVous);
  }
}
