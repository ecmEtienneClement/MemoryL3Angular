import { Subject } from 'rxjs';
import { NameModels } from 'src/models/NameModels';
import { EntitiesActionsTypes } from 'src/ngrx/Entities.actions';

export class EntitiesEmit {
  public static entitiesSub: Subject<IEntitiesEmit> = new Subject();

  public static emit(data: IEntitiesEmit) {
    this.entitiesSub.next(data);
  }
}
export interface IEntitiesEmit {
  idModel? : string
  nameModel: NameModels;
  nameAction: EntitiesActionsTypes;
}
