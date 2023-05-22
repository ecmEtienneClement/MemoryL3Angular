import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoClinique } from 'src/app/core/models/Models';
import { NameModels } from 'src/app/core/models/NameModels';
import { EntitiesDataAPI } from 'src/app/core/serviceEntities/EntitiesDataAPI';

@Injectable({ providedIn: 'root' })
export class InfoCliniApiService extends EntitiesDataAPI<InfoClinique> {
  constructor(httpClient: HttpClient) {
    super(httpClient, NameModels.infoClinique);
  }
}
