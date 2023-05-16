import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeRendezVous } from 'src/models/Models';
import { NameModels } from 'src/models/NameModels';
import { EntitiesDataAPI } from 'src/serviceEntities/EntitiesDataAPI';

@Injectable({ providedIn: 'root' })
export class TypeRVApiService extends EntitiesDataAPI<TypeRendezVous> {
  constructor(httpClient: HttpClient) {
    super(httpClient, NameModels.typeRendezVous);
  }
}
