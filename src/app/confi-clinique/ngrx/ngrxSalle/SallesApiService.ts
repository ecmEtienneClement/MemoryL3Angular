import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Salle } from 'src/models/Models';
import { NameModels } from 'src/models/NameModels';
import { EntitiesDataAPI } from 'src/serviceEntities/EntitiesDataAPI';

@Injectable({ providedIn: 'root' })
export class SalleApiService extends EntitiesDataAPI<Salle> {
  constructor(httpClient: HttpClient) {
    super(httpClient, NameModels.salle);
  }
}
