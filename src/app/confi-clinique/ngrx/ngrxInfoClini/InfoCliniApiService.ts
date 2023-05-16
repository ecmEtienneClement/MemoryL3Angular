import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoClinique } from 'src/models/Models';
import { NameModels } from 'src/models/NameModels';
import { EntitiesDataAPI } from 'src/serviceEntities/EntitiesDataAPI';

@Injectable({ providedIn: 'root' })
export class InfoCliniApiService extends EntitiesDataAPI<InfoClinique> {
  constructor(httpClient: HttpClient) {
    super(httpClient, NameModels.infoClinique);
  }
}
