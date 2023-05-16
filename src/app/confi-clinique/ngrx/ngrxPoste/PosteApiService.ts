import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Poste } from 'src/models/Models';
import { NameModels } from 'src/models/NameModels';
import { EntitiesDataAPI } from 'src/serviceEntities/EntitiesDataAPI';

@Injectable({ providedIn: 'root' })
export class PosteApiService extends EntitiesDataAPI<Poste> {
  constructor(httpClient: HttpClient) {
    super(httpClient, NameModels.poste);
  }
}
