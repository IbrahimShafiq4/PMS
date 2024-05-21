import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

export const employeeGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<UrlTree | boolean>
  | Promise<UrlTree | boolean>
  | UrlTree
  | boolean => {
  const _Router = inject(Router);
  if (localStorage.getItem('userToken')!==null && localStorage.getItem('role') == 'Employee') {
    return true;
  } else {
    _Router.navigate(['/auth']);
    return false;
  }
};
