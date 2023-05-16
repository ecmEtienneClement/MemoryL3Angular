import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeDeSalle } from 'src/models/Models';
import { NameModels } from 'src/models/NameModels';
import { EntitiesDataAPI } from 'src/serviceEntities/EntitiesDataAPI';

@Injectable({ providedIn: 'root' })
export class TypesDeSalleApiService extends EntitiesDataAPI<TypeDeSalle> {
  constructor(httpClient: HttpClient) {
    super(httpClient, NameModels.typeDeSalle);
  }
}
