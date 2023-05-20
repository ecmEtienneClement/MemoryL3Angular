import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface customeRouterState {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomeRouterSerializen
  implements RouterStateSerializer<customeRouterState>
{
  serialize(routerState: RouterStateSnapshot): customeRouterState {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = route;

    return { url, params, queryParams };
  }
}
