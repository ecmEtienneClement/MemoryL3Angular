import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesNames } from '../routes/routes.config';
import { EntitiesEmit } from '../serviceEntities/EntitiesEmit';

export default (): boolean => {
  const router = inject(Router);
  const routesNames = RoutesNames;
  const token = localStorage.getItem('token');

  //
  if (token == null || token == '') {
    router.navigate([routesNames.mLogin.login]);
    EntitiesEmit.emitLogin(false);
    return false;
  }
  //
  EntitiesEmit.emitLogin(true);
  return true;
};
